<?php

namespace App\Http\Controllers\Api\Website\InvitationGuests;

use Exception;
use Carbon\Carbon;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Http\Request;
use App\Jobs\ScheduleGuestJob;
use App\Services\WhatsappService;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\{ExportEmptyGuest, ExportGuest};
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Services\{GmailService, SMSService, PhoneNumberService};
use App\Notifications\{InvitationNotification, ConfirmationNotification, MinPointNotification};
use App\Models\{Cohost, CohostPoint, UserTemplate, InvitationGuests, Answer, Question, GuestAnswer, User};
use App\Http\Resources\Api\Website\InvitationGuests\{SimpleInvitationGuestsResource, InvitationGuestsResource};
use App\Http\Requests\Api\Website\InvitationGuests\{ScanRequest, ImportGuestRequest, ScheduleGuestRequest, InvitationGuestsRequest, SubmitAttendanceRequest, NewGuestRequest};

class InvitationGuestsController extends Controller
{

    protected WhatsappService $karix;

    public function __construct(WhatsappService $karix)
    {
        $this->karix = $karix;
    }

    public function index(Request $request)
    {
        $userTemplateId = $request->query('user_template_id');
        $query = InvitationGuests::where('user_template_id', $userTemplateId);

        if (request()->has('is_attending')) {
            $isAttending = request()->query('is_attending');
            $query->where('is_attending', $isAttending);
        }

        $guests = $query->get();

        return response()->json([
            'status' => 'success',
            'data' => InvitationGuestsResource::collection($guests),
            'message' => '',
        ]);
    }

    public function store(InvitationGuestsRequest $request)
    {
        if ((!isset($request->email) ||  $request->email == null || $request->email == "") && (!isset($request->phone) ||  $request->phone == null || $request->phone == "")) {
            $guest = InvitationGuests::create(array_except($request->validated(), 'answers'));

            if ($request->answers) {
                $this->answers($request->answers, $guest);
            }
        } elseif ((isset($request->email) ||  $request->email != null || $request->email != "") && (!isset($request->phone) ||  $request->phone == null || $request->phone == "")) {
            $guest = InvitationGuests::updateOrCreate(
                ['user_template_id' => $request->user_template_id, 'email' => $request->email],
                [
                    'name' => $request->name,
                    'phone' => $request->phone,

                    'number_of_invitees' => $request->number_of_invitees,
                    'is_attending' => $request->is_attending,
                ]
            );
            if ($request->answers) {
                $this->answers($request->answers, $guest);
            }
        } elseif ((!isset($request->email) ||  $request->email == null || $request->email == "") && (isset($request->phone) ||  $request->phone != null || $request->phone != "")) {
            $guest = InvitationGuests::updateOrCreate(
                ['user_template_id' => $request->user_template_id, 'phone' => $request->phone],
                [
                    'name' => $request->name,
                    'email' => $request->email,
                    'is_attending' => $request->is_attending,
                    'number_of_invitees' => $request->number_of_invitees,
                ]
            );
            if ($request->answers) {
                $this->answers($request->answers, $guest);
            }
        } else {
            $guest = InvitationGuests::updateOrCreate(
                ['user_template_id' => $request->user_template_id, 'email' => $request->email],
                [
                    'name' => $request->name,
                    'phone' => $request->phone,
                    'is_attending' => $request->is_attending,
                    'number_of_invitees' => $request->number_of_invitees,
                ]
            );
            if ($request->answers) {
                $this->answers($request->answers, $guest);
            }
        }
        return response()->json(['status' => 'success', 'data' => InvitationGuestsResource::make($guest), 'message' => 'Guest was added succesfully']);
    }

    public function addGuest(NewGuestRequest $request)
    {
        if (isset($request->phone) && (substr($request->phone, 0, 1) != '5' || substr($request->phone, 0, 1) != '05')) {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.worng_phone_format')], 422);
        }

        $auth = auth()->user();
        $user_template = UserTemplate::where('id', $request->user_template_id)->first();
        $cohost = Cohost::where(['user_template_id' => $request->user_template_id, 'status' => 'accepted', 'email' => $auth->email])->first();
        $added_by = $cohost ? 'cohost' : 'host';
        $data = ['added_by' => $added_by, 'added_by_id' => $auth->id, 'user_template_id' => $request->user_template_id, 'code' => generate_unique_code(8, '\\App\\Models\\InvitationGuests', 'code', 'letters')];

        if ($user_template->user_id != $auth->id && !isset($cohost)) {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => 'you have no permission to add guest'], 422);
        }

        // if($added_by == 'cohost' && ($cohost->add_guests >= $cohost->number_of_guests && $cohost->unlimited_guests == false))
        // {
        //     return response()->json(['status' => 'fail', 'data' => null, 'message' => 'you have no permission to add guest'], 422);
        // }

        $guest = InvitationGuests::create($request->validated() + $data);


        if ($added_by == 'cohost') $cohost->increment('add_guests', 1);

        return response()->json(['status' => 'success', 'data' => InvitationGuestsResource::make($guest), 'message' => 'Guest was added succesfully']);
    }

    public function updateGuest(NewGuestRequest $request, $id)
    {
        if (isset($request->phone) && (substr($request->phone, 0, 1) != '5' || substr($request->phone, 0, 1) != '05')) {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.worng_phone_format')], 422);
        }

        $auth = auth()->user();
        $user_template = UserTemplate::where('id', $request->user_template_id)->first();
        $cohost = Cohost::where(['user_template_id' => $request->user_template_id, 'status' => 'accepted', 'email' => $auth->email])->first();

        if ($user_template->user_id != $auth->id && !isset($cohost)) {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => 'you have no permission to add guest'], 422);
        }

        $guest = InvitationGuests::where('status', 'pending')->findOrFail($id);

        if (isset($guest->email)) {
            $guest->update(array_except($request->validated(), 'phone'));
        } else {
            $guest->update(array_except($request->validated(), 'email'));
        }

        return response()->json(['status' => 'success', 'data' => InvitationGuestsResource::make($guest->fresh()), 'message' => 'Guest was updated succesfully']);
    }

    public function destroy($id)
    {
        $guest = InvitationGuests::where('status', 'pending')->findOrFail($id);
        if ($guest->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('dashboard/admin.actions.deleted_successfully')]);
        }
        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.api.delete_fail')], 422);
    }

    public function sendSchedule(ScheduleGuestRequest $request, $id)
    {
        $user = auth('api')->user();

        $user_template = UserTemplate::findOrFail($id);

        $cohost = Cohost::where(['user_template_id' => $id, 'status' => 'accepted', 'email' => $user->email])->first();
        $send_by = $cohost ? 'cohost' : 'host';

        $guests = InvitationGuests::where(['user_template_id' => $id, 'status' => 'pending'])->get();
        $points = $user->points;
        $sum = $guests->sum('number_of_invitees');
        $cohost_points = 0;
        if ($send_by == 'cohost') {
            $guests = InvitationGuests::where(['user_template_id' => $id, 'status' => 'pending', 'added_by_id' => $user->id])->get();
            $cohost_points = CohostPoint::where(['cohost_id' => $user->id, 'host_id' => $user_template->user_id])->first();
            $sum = $guests->sum('number_of_invitees');
            if ($cohost_points) {
                $points = $points + $cohost_points->points;
                if ($points < $sum) {
                    $points = $user->points;
                }
            }
            if ($cohost->unlimited_guests == true && $cohost->add_guests < $sum) {
                return response()->json(['app/client.messages.you_have_no_enough_money'], 422);
            }
        }
        if ($points < $sum) {
            return response()->json(['app/client.messages.you_have_no_enough_money'], 422);
        }

        foreach ($guests as $guest) {
            $guest->update(['status' => 'schedule']);
        }
        $datetime = Carbon::createFromFormat(
            'Y-m-d H:i',
            $request->date . ' ' . $request->time,
            $request->time_zone
        );
        $delay = $datetime->diffInSeconds(now());
        ScheduleGuestJob::dispatch($guests, $sum, $user, $cohost, $cohost_points, $user_template)
            ->delay($delay)->onQueue('schedule_event');
        $user_template->update(['guest_type' => 'schedule']);
        return response()->json(['status' => 'success', 'data' => null, 'message' => '']);
    }

    public function cancelAttendance($id)
    {

        $user_template = UserTemplate::whereHas('invitationGuests', function ($q) {
            $q->where('status', 'schedule');
        })->findOrFail($id);

        $guests = InvitationGuests::where(['user_template_id' => $id, 'status' => 'schedule', 'added_by_id' => auth('api')->id()])->get();

        foreach ($guests as $guest) {
            $guest->update(['status' => 'pending']);
        }
        $user_template->update(['guest_type' => 'normal']);
        return response()->json(['status' => 'success', 'data' => null, 'message' => '']);
    }

    public function submitAttendance(SubmitAttendanceRequest $request)
    {
        $user_template = UserTemplate::where('code', $request->user_template_token)->firstOrFail();
        $user = $user_template->user;
        if (request()->guest_token) {
            $answered_by = 'guest';
            $answered_by_id = null;
            if($request->answered_email && $request->answered_email != null){
                if($user->email == $request->answered_email){
                    $answered_by = 'host';
                    $answered_by_id = $user->id;
                }else{
                    $cohost = Cohost::where(['user_template_id' => $user_template->id, 'status' => 'accepted', 'email' => $request->answered_email])->first();
                    if($cohost){
                        $answered_by = 'cohost';
                        $cohost_user = User::where('email', $cohost->email)->first() ;
                        $answered_by_id = $cohost_user ? $cohost_user->id : null;
                    }
                }
            }
            $guest = InvitationGuests::where(['code' => $request->guest_token, 'user_template_id' => $user_template->id])->firstOrFail();
            $guest->guestAnswers()->where(['user_template_id' => $user_template->id])->delete();
            $guest->update(['is_attending' => $request->is_attending, 'comment' => $request->comment, 'answered_by_id' => $answered_by_id, 'answered_by' => $answered_by]);
            if ($request->is_attending == false) $user->increment('points', $guest->number_of_invitees);
            if ($request->answers) {
                $this->answers($request->answers, $guest);
            }
        } else {
            if (isset($request->phone) && (substr($request->phone, 0, 1) != '5' || substr($request->phone, 0, 1) != '05')) {
                return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.worng_phone_format')], 422);
            }
            $guest = null;
            if (request()->email) {
                $guest = InvitationGuests::where(['user_template_id' => $user_template->id])->where('email', request()->email)->first();
            } elseif (request()->phone) {
                $guest = InvitationGuests::where(['user_template_id' => $user_template->id])->where('phone', request()->phone)->first();
            }
            if ($guest) {
                $guest->guestAnswers()->where(['user_template_id' => $user_template->id])->delete();
                $guest->update(['is_attending' => $request->is_attending, 'comment' => $request->comment]);
                if ($request->is_attending == false) $user->increment('points', $guest->number_of_invitees);

                if ($request->answers) {
                    $this->answers($request->answers, $guest);
                }
            } else {
                if (isset($request->host_token)) {
                    $user = User::where('hash_code', $request->host_token)->firstOrFail();
                }
                if ($user->points <= 0) {
                    return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.plaese_contact_host')], 422);
                }
                $guest = InvitationGuests::create(array_except($request->validated() + ['user_template_id' => $user_template->id, 'status' => 'Sent', 'number_of_invitees' => 1, 'code' => generate_unique_code(8, '\\App\\Models\\InvitationGuests', 'code', 'letters')], 'answers'));
                $user->update(['points' => $user->points - 1]);
                if ($request->answers) {
                    $this->answers($request->answers, $guest);
                }
            }
        }
        if ($request->is_attending == true) {

            $host_token = $request->host_token ? $request->host_token : $guest->userTemplate->user->hash_code;
            $data = [];
            $data['url']    =  env('APP_URL') . '/invitation' . '/' . $guest->userTemplate->code . "/" . $host_token . "/" . $guest->code . "?qr=true";
            $data['date'] = now();
            $data['guest_name'] = $guest->name;
            $data['event_name'] = $user_template->title;
            $data['event_date'] = $user_template->date ?? 'NA';
            $data['event_time'] = $user_template->time ?? 'NA';
            $data['event_address'] = $user_template->address ?? 'NA';
            if ($guest->email != null) {
                $gmail_service = new GmailService();
                $htmlBody = view('emails.confirmation', compact('data'))->render();
                $gmail_service->sendEmailViaGmailApi($guest->email, $htmlBody, 'Confirmation');
                // $guest->notify(new ConfirmationNotification($data, $guest->email, ['mail']));
            } else {
                if($user_template->locale == 'en'){
                    $message = "Dear " . $guest->name . ", Thank you for confirming your attendance at " . $user_template->name . "! We are excited to have you join us.
                         " . $data['url'];
                }else{
                    $message = "شكرا لتأكيد حضوركم، وجودكم يسعدنا";
                }
                $phone   =  $guest->phone;
                SMSService::sendFccSMS($message, $phone);
            }
        }

        return response()->json(['status' => 'success', 'data' => InvitationGuestsResource::make($guest), 'message' => 'Guest was added succesfully']);
    }

    public function updateAttendance(Request $request)
    {
        $invitation_id = $request->json("invitation_id");
        $guest_email = $request->json("guest_email");
        $attendance = $request->json('attendance');
        $guest = InvitationGuests::where("user_template_id", $invitation_id)->where('email', $guest_email)->first();

        if (!$guest) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Guest or invitation not found',
            ], 400);
        }

        $guest->is_attending = $attendance;
        $guest->save();

        return response()->json([
            'status' => 'success',
            'message' => '',
        ]);
    }

    public function getAttendance($id)
    {
        $attending_guests = InvitationGuests::where("user_template_id", $id)->where("is_attending", true)->get();
        $not_attending_guests = InvitationGuests::where("user_template_id", $id)->where("is_attending", false)->get();

        return response()->json([
            'status' => 'success',
            'attending' => InvitationGuestsResource::collection($attending_guests),
            'not_attending' => InvitationGuestsResource::collection($not_attending_guests),
            'message' => '',
        ]);
    }

    public function sendInvetation($id)
    {
        $user = auth('api')->user();
        $cohost = Cohost::where(['user_template_id' => $id, 'status' => 'accepted', 'email' => $user->email])->first();
        $send_by = $cohost ? 'cohost' : 'host';

        $guests = InvitationGuests::where(['user_template_id' => $id, 'status' => 'pending'])->get();
        $points = $user->points;
        $user_template = UserTemplate::findOrFail($id);
        $sum = $guests->sum('number_of_invitees');
        if ($send_by == 'cohost') {
            $guests = InvitationGuests::where(['user_template_id' => $id, 'status' => 'pending', 'added_by_id' => $user->id])->get();
            $cohost_points = CohostPoint::where(['cohost_id' => $user->id, 'host_id' => $user_template->user_id])->first();
            $sum = $guests->sum('number_of_invitees');
            $points = $user->points;
            if ($cohost_points) {
                $points = $cohost_points->points;
                if ($points < $sum) {
                    $points = $user->points;
                }
            }
            if ($cohost->unlimited_guests == true && $cohost->add_guests < $sum) {
                return response()->json(['app/client.messages.you_have_no_enough_money'], 422);
            }
            $user = User::where('email', $cohost->email)->first();
        }

        if ($points < $sum) {
            return response()->json(['app/client.messages.you_have_no_enough_money'], 422);
        }

        $data = [];
        foreach ($guests as $guest) {

            $guest->update(['status' => 'Sent', 'sent_at' => Carbon::now()]);

            $data['url']    =  env('APP_URL') . '/invitation' . '/' . $guest->userTemplate->code . "/" . $user->hash_code . "/" . $guest->code;
            $data['name']   =  $guest->name;
            $data['date']   =  Carbon::now()->toFormattedDateString();
            $data['full_name']   =  $guest->userTemplate->user->full_name;
            $data['title']   =  $guest->userTemplate->title;

            if ($guest->email != null) {
                $image = $guest->userTemplate->media()->where('option', 'asset_envelopeBack')->first();
                $data['image']  = $image ? asset('storage/images/user_templates/' . $image->media) : '';
                $gmail_service = new GmailService();
                if($user_template->locale == 'ar'){
                    $htmlBody = view('emails.invitation_ar', compact('data'))->render();
                }else{
                    $htmlBody = view('emails.invitation', compact('data'))->render();
                }
                // if ($user_template->templateSetting->send_email == true) {
                    $gmail_service->sendEmailViaGmailApi($guest->email, $htmlBody, 'Invitation');
                // }
                // $guest->notify(new InvitationNotification($data, $guest->email, ['mail']));
            } else {
                // ". $guest->userTemplate->user-> full_name."
                // $message = "أرسل لك ". $data['full_name']."دعوة لحضور". $data['title']."
                //     اضغط لمشاهدة الدعوة والرد " .$data['url'];
                $name = $guest->name;
                $event_name = $user_template->title;
                $date = $user_template->date;

                $image = $guest->userTemplate->media()->where('option', 'asset_card')->first();
                $data['image']  = $image ? asset('storage/images/user_templates/' . $image->media) : '';
                // info($data['image']);
                $message = $user->full_name . " is pleased to invite you to attend " . $data['title'] . "\n" .
                    " Please confirm your attendance or send your apologies through the attached link: " . "\n" .
                    $data['url'] . "\n\n" . "Darf Platform for Electronic Invitation Management.";
                    
                if ($user_template->locale == 'ar') {
                    $message = "يسر ". $user->full_name . "\n" .
                        "دعوتك لحضور «" . $data['title'] . "»\n" .
                        "يرجى تأكيد الحضور أو الاعتذار عبر الرابط المرفق:\n" .
                        $data['url'] . "\n\n" .
                        "منصة ظرف لإدارة الدعوات الإلكترونية";
                }                

                $phone   =  $guest->phone;

                $guest_token = $guest->code;
                $user_template_token = $user_template->code;
                $host_token = auth('api')->user()->hash_code;
                $templateSetting = $user_template->templateSetting;
                $sendWhatsapp = (bool) optional($templateSetting)->send_whatsapp;
                $sendSms = (bool) optional($templateSetting)->send_sms;
                $messageGender = optional($templateSetting)->message_gender;

                if($sendWhatsapp) {
                    $this->karix->sendInvitation((string) $guest->phone, [$name, $event_name, $user->full_name], $data['image'], [$guest_token, $user_template_token, $host_token,$user_template->locale, $messageGender]); //TODO
                }
                if($sendSms) {
                    SMSService::sendFccSMS($message, $phone);
                }
            }
        }

        if ($send_by == 'cohost') {
            $cohost_points->decrement('points', $sum);
            $cohost->decrement('add_guests', $sum);
        } else {
            $user->decrement('points', $sum);
        }
        $user_template->update(['type' => 'sent', 'guest_type' => 'normal']);
        $user->fresh();
        if ($user->points <= 25) {
            $user->notify(new MinPointNotification(['database']));
        }
        return response()->json(['status' => 'success', 'data' => null, 'message' => '']);
    }

    public function answers($guest_answers, $guest)
    {
        foreach ($guest_answers as $guest_answer) {
            $question = Question::where(['user_template_id' => $guest->user_template_id, 'id' => $guest_answer['question_id']])->firstOr(function () {
                throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.question_not_found')], 422));
            });
            if (isset($guest_answer['answer_id'])) {
                foreach ($guest_answer['answer_id'] as $answer_id) {
                    $answer = Answer::where(['question_id' =>  $question->id, 'id' => $answer_id])->firstOr(function () {
                        throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.answer_not_found')], 422));
                    });
                    GuestAnswer::create([
                        'user_template_id'      =>  $guest->user_template_id,
                        'invitation_guest_id'   =>  $guest->id,
                        'question_id'           =>  @$guest_answer['question_id'],
                        'answer_id'             =>  @$answer_id,
                        // 'answer'                =>  @$guest_answer['answer'],
                    ]);
                }
            } elseif (isset($guest_answer['answer'])) {

                GuestAnswer::create([
                    'user_template_id'      =>  $guest->user_template_id,
                    'invitation_guest_id'   =>  $guest->id,
                    'question_id'           =>  @$guest_answer['question_id'],
                    // 'answer_id'             =>  @$answer_id,
                    'answer'                =>  @$guest_answer['answer'],
                ]);
            }
        }
        return true;
    }

    public function statistics(Request $request, $id)
    {
        $auth = auth()->user();
        $cohost = Cohost::where(['user_template_id' => $id, 'status' => 'accepted', 'email' => $auth->email])->first();

        $all_guests = InvitationGuests::where('status', '!=', 'pending')->where(['user_template_id' => $id])
            ->when($cohost, function ($q) use ($auth) {
                $q->where('added_by_id', $auth->id);
            })->when(!$cohost && $request->added_by, function ($q) use ($request) {
                $q->where('added_by', $request->added_by);
            })->count();
        $attending_guests = InvitationGuests::where(['user_template_id' => $id, 'is_attending' => true])
            ->when($cohost, function ($q) use ($auth) {
                $q->where('added_by_id', $auth->id);
            })->when(!$cohost && $request->added_by, function ($q) use ($request) {
                $q->where('added_by', $request->added_by);
            })->count();
        $regret_guests = InvitationGuests::where(['user_template_id' => $id, 'is_attending' => false])
            ->when($cohost, function ($q) use ($auth) {
                $q->where('added_by_id', $auth->id);
            })->when(!$cohost && $request->added_by, function ($q) use ($request) {
                $q->where('added_by', $request->added_by);
            })->count();
        $sent_guests = InvitationGuests::where(['user_template_id' => $id, 'status' => 'Sent', 'is_attending' => null])
            ->when($cohost, function ($q) use ($auth) {
                $q->where('added_by_id', $auth->id);
            })->when(!$cohost && $request->added_by, function ($q) use ($request) {
                $q->where('added_by', $request->added_by);
            })->count();
        $answerd_guests = InvitationGuests::has('guestAnswers')->where(['user_template_id' => $id, 'is_attending' => true])
            ->when($cohost, function ($q) use ($auth) {
                $q->where('added_by_id', $auth->id);
            })->when(!$cohost && $request->added_by, function ($q) use ($request) {
                $q->where('added_by', $request->added_by);
            })->count();
        // $not_answered_guests = InvitationGuests::doesntHave('guestAnswers')->where(['user_template_id' => $id ])->count();

        return response()->json([
            'status' => 'success',
            'data' => [
                'all'           => (int) $all_guests,
                'attending'     => (int) $attending_guests,
                'regrets'       => (int) $regret_guests,
                'sent'          => (int) $sent_guests,
                'answered'      => (int) $answerd_guests,
                'notAnswered'   => (int) $attending_guests - $answerd_guests,
            ],
            'message' => '',
        ]);
    }

    public function tracking(Request $request, $id)
    {
        $auth = auth('api')->user();
        $user_template = UserTemplate::where('id', $id)->first();
        $cohost = Cohost::where(['user_template_id' => $id, 'status' => 'accepted', 'email' => $auth->email])->first();

        if ($user_template->user_id != $auth->id && !isset($cohost)) {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => 'you have no permission to track guests'], 422);
        }
        if ($cohost) {
            if ($cohost->allow_track_guests == false)  return response()->json(['status' => 'fail', 'data' => null, 'message' => 'you have no permission to track guests'], 422);
        }
        $guests = InvitationGuests::where(['user_template_id' => $id])
            ->where('status', '!=', 'pending')
            ->when($cohost, function ($q) use ($auth) {
                $q->where('added_by_id', $auth->id);
            })->when(!$cohost && $request->added_by, function ($q) use ($request) {
                $q->where('added_by', $request->added_by);
            })->when($request->attend_status == 'Attending', function ($q) {
                $q->where('is_attending', true);
            })->when($request->attend_status == 'schedule', function ($q) {
                $q->where('status', 'schedule');
            })->when($request->attend_status == 'Pending', function ($q) {
                $q->where('status', 'pending');
            })->when($request->attend_status == 'Regrets', function ($q) {
                $q->where(['status' => 'Sent', 'is_attending' => false]);
            })->when($request->attend_status == 'Sent', function ($q) {
                $q->where(['status' => 'Sent', 'is_attending' => null]);
            })->when($request->answers_status == 'Answered', function ($q) {
                $q->has('guestAnswers');
            })->when($request->answers_status == 'NotAnswered', function ($q) {
                $q->doesntHave('guestAnswers');
            })->latest()->paginate(500);
        $data = [];
        $status = '';
        foreach ($guests as $guest) {
            if ($guest->status == 'Sent' && $guest->is_attending ===  null) {
                $status = 'Sent';
            } elseif ($guest->is_attending == 1) {
                if ($guest->status == 'Attended') {
                    $status = 'Attended';
                } elseif ($guest->status == 'Inprogress') {
                    $status = 'Inprogress';
                } else {
                    $status = 'Attending';
                }
            } elseif ($guest->is_attending === 0 && $guest->status == 'Sent') {
                $status = 'Regrets';
            } elseif ($guest->status == 'pending') {
                $status = 'Pending';
            }
            $guestData = [
                'id'                    => $guest->id,
                'guest_token'           => $guest->code,
                'host_token'            => $guest->addedBy->hash_code,
                'name'                  => $guest->name,
                'email'                 => $guest->email,
                'phone'                 => $guest->phone,
                'scanned_number'        => $guest->scanned_number,
                'number_of_invitees'    => $guest->number_of_invitees,
                'personal_note'         => $guest->personal_note,
                'comment'               => $guest->comment,
                'attendanceStatus'      => $status,
                'answered_by'           => $guest->answered_by ?? 'guest',
                'answered_by_obj'       => $guest->answeredByObj ? [
                    'id'    =>  $guest->answeredByObj->id,
                    'name'    =>  $guest->answeredByObj->full_name,
                    'email'    =>  $guest->answeredByObj->email,
                ] : null,
                'cohost'                => $cohost ? [
                    'id'    =>  $cohost->id,
                    'name'    =>  $cohost->name,
                    'email'    =>  $cohost->email,
                ] : null,

                'answers'               => []
            ];

            // Get unique question ids from guest answers
            $question_ids = $guest->guestAnswers->pluck('question_id')->unique()->toArray();

            foreach ($question_ids as $question_id) {
                $question = Question::findOrFail($question_id);
                if ($question->type == 'short') {
                    $answer = GuestAnswer::where('question_id', $question_id)
                        ->where('invitation_guest_id', $guest->id)
                        ->first();
                    $guestData['answers'][] = [
                        'question' => $question_id,
                        'answer' => $answer->answer
                    ];
                } else {
                    $answers = GuestAnswer::where('question_id', $question_id)
                        ->where('invitation_guest_id', $guest->id)
                        ->pluck('answer_id')
                        ->toArray();
                    $guestData['answers'][] = [
                        'question' => $question_id,
                        'answer' => $answers
                    ];
                }
            }

            $data[] = $guestData;
        }

        return [
            'status' => 'success',
            'data' => $data,
            'message' => '',
            'pagination' => [
                'total' => $guests->total(),
                'per_page' => $guests->perPage(),
                'current_page' => $guests->currentPage(),
                'last_page' => $guests->lastPage(),
                'from' => $guests->firstItem(),
                'to' => $guests->lastItem(),
            ],
        ];
    }

    public function paginate($items, $perPage = 5, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options + ['path' => url()->current()]);
    }

    public function scan(ScanRequest $request)
    {
        $guest = InvitationGuests::where(['code' => $request->guest_token, 'is_attending' => 1])->whereHas('userTemplate', function ($q) use ($request) {
            $q->where('checker_token', $request->checker_token);
        })->firstOr(function () {
            throw new HttpResponseException(response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.valid_qr')], 422));
        });
        if ($guest->number_of_invitees == $guest->scanned_number) {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.valid_qr')], 422);
        }
        DB::beginTransaction();
        try {
            $guest->update([
                'scanned_number' => $guest->scanned_number + 1,
                'status' => $guest->number_of_invitees == ($guest->scanned_number + 1) ? 'Attended' : 'Inprogress',
            ]);
            DB::commit();
            return response()->json(['status' => 'success', 'data' => InvitationGuestsResource::make($guest->fresh()), 'message' => trans('app/client.messages.scanned_successfully')]);
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.something_went_wrong_please_try_again')], 422);
        }
    }

    public function getGuestsByCohost($id)
    {
        $guests = InvitationGuests::where(['added_by_id' => auth('api')->id(), 'user_template_id' => $id, 'status' => 'pending'])->latest()->paginate(500);
        return SimpleInvitationGuestsResource::collection($guests)->additional(['status' => 'success', 'message' => '']);
    }

    public function guestsForEditor($code)
    {
        $data['attending_guests'] = InvitationGuests::whereHas('userTemplate', function ($q) use ($code) {
            $q->where(['code' => $code, 'show_guest_list' => true]);
        })
            // ->where('status', '!=', 'pending')
            ->where('is_attending', true)

            ->latest()
            ->get();
        // ->groupBy('status'); // Group by status

        $data['not_replied_guests'] = InvitationGuests::whereHas('userTemplate', function ($q) use ($code) {
            $q->where(['code' => $code, 'show_guest_list' => true]);
        })
            // ->where('status', '!=', 'pending')
            ->where('is_attending', true)->doesntHave('guestAnswers')->latest()->get();

        // Flatten the grouped collection for pagination and retrieve pagination details
        // $flattenedGuests = $guests->flatten(1);
        // $page = request('page', 1);
        // $perPage = request('per_page', 15);
        // $total = $flattenedGuests->count();

        // // Paginate the flattened results
        // $paginatedGuests = new LengthAwarePaginator(
        //     $flattenedGuests->forPage($page, $perPage), // Slice the collection for the current page
        //     $total, // Total items
        //     $perPage, // Items per page
        //     $page, // Current page
        //     ['path' => request()->url(), 'query' => request()->query()] // To generate pagination links
        // );

        // Restructure the grouped data for the `data` section
        // $groupedPaginatedData = $paginatedGuests->groupBy('status')->map(function ($items) {
        //     return $items->values(); // Reset array keys for each status group
        // });

        // Return the response in the desired format
        return response()->json([
            'data' => $data,
            // 'links' => [
            //     'first' => $paginatedGuests->url(1),
            //     'last' => $paginatedGuests->url($paginatedGuests->lastPage()),
            //     'prev' => $paginatedGuests->previousPageUrl(),
            //     'next' => $paginatedGuests->nextPageUrl(),
            // ],
            // 'meta' => [
            //     'current_page' => $paginatedGuests->currentPage(),
            //     'from' => $paginatedGuests->firstItem(),
            //     'last_page' => $paginatedGuests->lastPage(),
            //     'links' => $paginatedGuests->linkCollection()->toArray(),
            //     'path' => $paginatedGuests->path(),
            //     'per_page' => $paginatedGuests->perPage(),
            //     'to' => $paginatedGuests->lastItem(),
            //     'total' => $paginatedGuests->total(),
            // ],
            'status' => 'success',
            'message' => '',
        ]);
    }

    public function exportEmptyGuests()
    {
        return Excel::download(new ExportEmptyGuest(), 'guests.xlsx');
    }

    public function exportGuests(Request $request, $id)
    {
        $name = $request->status ? $request->status : 'all_guests';
        return Excel::download(new ExportGuest($request->status, $id), $name . '.xlsx');
    }

    public function import(ImportGuestRequest $request, $id)
    {

        DB::beginTransaction();

        try {

            $user = auth()->guard('api')->user();
            $cohost = Cohost::where(['user_template_id' => $id, 'status' => 'accepted', 'email' => $user->email])->first();
            $added_by = $cohost ? 'cohost' : 'host';

            $file_path = $request->file('attachment')->store('temp');
            $saved_path = storage_path('app') . '/' . $file_path;

            $data = Excel::toArray([], $saved_path);

            if (! empty($data)) {
                $data = array_slice($data[0], 1);
            }
            $user_template = UserTemplate::findOrFail($id);
            if ($user_template->user_id != $user->id && !isset($cohost)) {
                return response()->json(['status' => 'fail', 'data' => null, 'message' => 'you have no permission to add guest'], 422);
            }
            if ($data != null && count($data) > 0) {

                $errors = [];
                foreach ($data as $key => $arr) {
                    if (!filter_var($arr[1], FILTER_VALIDATE_EMAIL)) {
                        if (!preg_match('/^\+?[0-9]{8,15}$/', $arr[1])) {
                            // $errors['row'] = $key;
                            array_push($errors, 'Invalid Phone Or Email in row number ' . $key + 2);
                        } else {
                            $phone = PhoneNumberService::validateIfPhoneStartWithZero($arr[1]);
                            if (isset($phone) && (substr($phone, 0, 1) != '5' || substr($phone, 0, 1) != '05')) {
                                // $errors['row'] = $key;
                                array_push($errors, 'Phone number must start with 5 or 05 in row number ' . $key + 2);
                            } else {
                                $check = InvitationGuests::where(['user_template_id' => $id, 'phone' => $phone])->first();
                                if ($check) {
                                    // $errors['row'] = $key;
                                    array_push($errors, 'Phone already exist in row number ' . $key + 2);
                                } else {
                                    $guest = InvitationGuests::create([
                                        'user_template_id' => $id,
                                        'name' => $arr[0],
                                        'phone' => $phone,
                                        'number_of_invitees' => 1,
                                        'code' => generate_unique_code(8, '\\App\\Models\\InvitationGuests', 'code', 'letters'),
                                        'added_by'  => $added_by,
                                        'added_by_id'  => $user->id,
                                    ]);
                                }
                            }
                        }
                    } else {
                        $check = InvitationGuests::where(['user_template_id' => $id, 'email' => $arr[1]])->first();
                        if ($check) {
                            // $errors['row'] = $key;
                            array_push($errors, 'Email already exist in row number ' . $key + 2);
                        } else {
                            $guest = InvitationGuests::create([
                                'user_template_id' => $id,
                                'name' => $arr[0],
                                'email' => $arr[1],
                                'number_of_invitees' => 1,
                                'code' => generate_unique_code(8, '\\App\\Models\\InvitationGuests', 'code', 'letters'),
                                'added_by'  => $added_by,
                                'added_by_id'  => $user->id,
                            ]);
                        }
                    }
                }
            } else {
                return response()->json(['status' => 'fail', 'data' => null, 'message' => 'Fill The File Please'], 422);
            }

            DB::commit();

            return response()->json(['status' => 'success', 'data' => null, 'errors' => $errors, 'message' => 'imported successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            info($e);
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.catch.fail')], 422);
        }
    }

    public function acceptInvitationForWhatsapp(Request $request)
    {
        // info(env('APP_URL') . '/invitation' . '/' . $guest->userTemplate->code ."/" . $user->hash_code . "/" . $guest->code. "?qr=true");
        $guest = InvitationGuests::where(['code' => $request->guest_token])->firstOrFail();
        $user_template = UserTemplate::where('code', $guest->userTemplate->code)->firstOrFail();
        $user = $user_template->user;

        // $guest->update(['is_attending' => true]);

        return redirect()->away(env('APP_URL') . '/invitation' . '/' . $guest->userTemplate->code . "/" . $user->hash_code . "/" . $guest->code);
    }

    public function rejectInvitationForWhatsapp(Request $request)
    {
        // info(env('APP_URL') . '/invitation' . '/' . $guest->userTemplate->code ."/" . $user->hash_code . "/" . $guest->code. "?qr=true");
        $guest = InvitationGuests::where(['code' => $request->guest_token])->firstOrFail();
        $user_template = UserTemplate::where('code', $guest->userTemplate->code)->firstOrFail();
        $user = $user_template->user;
        if ($guest->is_attending == true) {
            return redirect()->away(env('APP_URL') . '/invitation' . '/' . $guest->userTemplate->code . "/" . $user->hash_code . "/" . $guest->code . "?qr=true");
        } elseif ($guest->is_attending == false) {
            return redirect()->away(env('APP_URL') . '/invitation' . '/' . $guest->userTemplate->code . "/" . $user->hash_code . "/" . $guest->code);
        }
        $guest->update(['is_attending' => false]);

        $user->increment('points', $guest->number_of_invitees);


        return redirect()->away(env('APP_URL') . '/invitation' . '/' . $guest->userTemplate->code . "/" . $user->hash_code . "/" . $guest->code);
    }

    public function deletePendingGuests($id)
    {
        $guests = InvitationGuests::whereHas('userTemplate', function ($q) use ($id) {
            $q->where(['id' => $id, 'user_id' => auth('api')->id()]);
        })->where(['status' => 'pending'])->get();
        
        foreach ($guests as $guest) {
            $guest->delete();
        }
        return response()->json(['status' => 'success', 'data' => null, 'message' => '']);
    }
}
