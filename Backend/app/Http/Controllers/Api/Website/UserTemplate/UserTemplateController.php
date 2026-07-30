<?php

namespace App\Http\Controllers\Api\Website\UserTemplate;

use Exception;
use Carbon\Carbon;
use App\Models\{Logo, Answer, Cohost, AppMedia, Question, GuestAnswer, UserTemplate, InvitationGuests, TemplateSetting};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Jobs\{RemindAttendedGuestJob, RemindNotAttendedGuestJob};
use App\Http\Resources\Api\Dashboard\Admin\Asset\LogoResource;
use App\Http\Requests\Api\Website\UserTemplate\{EventLogoRequest, TemplateSettingRequest, UserTemplateRequest};
use App\Http\Resources\Api\Website\UserTemplate\UserTemplateResource;
use App\Http\Resources\Api\Website\InvitationGuests\InvitationGuestsResource;


class UserTemplateController extends Controller
{

    public function index(Request $request)
    {
        $templates = UserTemplate::where(['user_id' => auth('api')->id()])
            ->when($request->type, function ($q) use ($request) {
                $q->where('type', $request->type);
            })->when($request->keyword, function ($q) use ($request) {
                $q->where(function ($q) use ($request) {
                    $q->whereLike('name', '%' . $request->keyword . '%')
                        ->orWhereLike('title', '%' .  $request->keyword . '%');
                });
            })->when($request->status == 'recent', function ($q) use ($request) {
                $q->orderBy('updated_at', 'desc');
            })->when($request->status == 'draft', function ($q) use ($request) {
                $q->where('type', 'draft');
            })->when($request->status == 'sent', function ($q) use ($request) {
                $q->where('type', 'sent');
            })->when($request->status == 'private', function ($q) use ($request) {
                $q->where('added_by', 'admin');
            })->latest()->paginate($request->per_page);

        return UserTemplateResource::collection($templates)->additional(['status' => 'success', 'message' => '']);
    }

    public function show($id)
    {
        $template = UserTemplate::findOrFail($id);
        return UserTemplateResource::make($template);
    }

    public function store(UserTemplateRequest $request)
    {
        DB::beginTransaction();

        try {
            $user = auth('api')->user();
            $user_template = UserTemplate::create(array_merge(
                $request->validated(),
                [
                    'user_id' => $user->id,
                    'code' => generate_unique_code(8, '\\App\\Models\\UserTemplate', 'code', 'letters'),
                    'checker_token' => generate_unique_code(7, '\\App\\Models\\UserTemplate', 'code', 'letters'),
                ]
            ));

            if ($request->questions) {
                foreach ($request->questions as $q) {
                    $question = Question::create(array_except(
                        [
                            'title' => $q['title'],
                            'type' => $q['type'],
                            'user_template_id' => $user_template->id
                        ],
                        'answers'
                    ));
                    if ($q['type'] != 'short') {
                        foreach ($q['answers'] as $answer) {
                            Answer::create(['title' => $answer, 'question_id' => $question->id]);
                        }
                    }
                }
            }
            if($request->date){
 
                $reminder_attended_duration = isset($request->reminder_attended_duration) ? (int) $request->reminder_attended_duration : 1;
                $reminder_not_attended_duration = isset($request->reminder_not_attended_duration) ? (int) $request->reminder_not_attended_duration : 5;
                
                $template_setting = $user_template->templateSetting()->create([
                    'reminder_attended_duration' => $reminder_attended_duration,
                    'reminder_not_attended_duration' => $reminder_not_attended_duration,
                ]);
                
                RemindAttendedGuestJob::dispatch($user_template->id)
                    ->delay(Carbon::parse($user_template->date)->subDays($reminder_attended_duration))->onQueue('schedule_event');
            }
	    DB::commit();
            return response()->json(['status' => 'success', 'data' => UserTemplateResource::make($user_template), 'message' => '']);
        } catch (Exception $e) {
            DB::rollback();
            info($e);
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.messages.something_went_wrong_please_try_again')], 422);
        }
    }

    public function update(UserTemplateRequest $request, $id)
    {
        $user = auth()->user();
        $cohost = Cohost::where(['user_template_id' => $id, 'status' => 'accepted', 'email' => $user->email])->first();

        $user_template = UserTemplate::findOrFail($id);
        $old_date = $user_template->date;

        if ($user_template->user_id != $user->id && !isset($cohost)) {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => 'you have no permission to update event'], 422);
        }

        if ($cohost) {
            if ($cohost->allow_customize_events == false)  return response()->json(['status' => 'fail', 'data' => null, 'message' => 'you have no permission to update event'], 422);
        }

        $user_template->update(array_merge(
            $request->validated(),
            ['user_id' => $user->id]
        ));

        if ($request->questions) {
            // if($user_template->questions){
            //     foreach($user_template->questions as $question){
            //         if(count($question->guestAnswers) > 0){
            //             return response()->json(['status' => 'fail' , 'data' => null ,'message' => trans('app/client.messages.sorry_you_cant_update_this_questions'),422]);
            //         }
            //     }
            // }
            $user_template->questions()->delete();
            foreach ($request->questions as $q) {
                $question = Question::create(array_except(
                    [
                        'title' => $q['title'],
                        'type' => $q['type'],
                        'user_template_id' => $user_template->id
                    ],
                    'answers'
                ));
                if ($q['type'] != 'short') {
                    foreach ($q['answers'] as $answer) {
                        Answer::create(['title' => $answer, 'question_id' => $question->id]);
                    }
                }
            }
        }

        if(isset($request->date) && $request->date != $old_date){
            $reminder_attended_duration = isset($request->reminder_attended_duration) ? (int) $request->reminder_attended_duration : 1;
                $reminder_not_attended_duration = isset($request->reminder_not_attended_duration) ? (int) $request->reminder_not_attended_duration : 5;
                
                $template_setting = $user_template->templateSetting()->create([
                    'reminder_attended_duration' => $reminder_attended_duration,
                    'reminder_not_attended_duration' => $reminder_not_attended_duration,
                ]);
                RemindAttendedGuestJob::dispatch($user_template->id)
                    ->delay(Carbon::parse($user_template->date)->subDays($reminder_attended_duration)->setTime(18, 0, 0))->onQueue('schedule_event');

               // RemindNotAttendedGuestJob::dispatch($user_template->id)
               //    ->delay(Carbon::parse($user_template->date)->subDays(5))->onQueue('schedule_event');
            }
        return response()->json(['status' => 'success', 'data' => UserTemplateResource::make($user_template), 'message' => '']);
    }

    public function history($id)
    {
        $guest = InvitationGuests::findOrFail($id);
        $data = [];
        if ($guest->status == 'Sent' && $guest->is_attending === null) {
            $data[] = [
                'type' => "status",
                'value' => 'Sent',
                'done_at' => $guest->created_at,
            ];
        } elseif ($guest->is_attending == true) {
            $data[] = [
                'type' => "status",
                'value' => 'Attending',
                'done_at' => $guest->created_at,
            ];
            if($guest->answered_by == 'host' || $guest->answered_by == 'cohost'){
                $data[] = [
                    'type' => "answered_by_".$guest->answered_by,
                    'value' => $guest->answeredByObj ? $guest->answeredByObj->full_name : null,
                    'done_at' => $guest->created_at,
                ];
            }
            if ($guest->guestAnswers) {
                $data[] = [
                    'type' => "answers",
                    'value' => $this->test($guest),
                    'done_at' => $guest->created_at,
                ];
            }
            if ($guest->comment != null) {
                $data[] = [
                    'type' => "comment",
                    'value' => $guest->comment,
                    'done_at' => $guest->created_at,
                ];
            }
        } elseif ($guest->is_attending == false) {
            $data[] = [
                'type' => "status",
                'value' => 'Regrets',
                'done_at' => $guest->created_at,
            ];
            if ($guest->comment != null) {
                $data[] = [
                    'type' => "comment",
                    'value' => $guest->comment,
                    'done_at' => $guest->created_at,
                ];
            }
        }
        // $data[]=

        return response()->json([
            'status' => 'success',
            'data' => $data,
            'message' => ''
        ]);
    }

    public function test($guest)
    {
        $question_ids = $guest->guestAnswers->pluck('question_id')->unique()->toArray();
        $guestData = [];
        foreach ($question_ids as $question_id) {
            $question = Question::findOrFail($question_id);
            if ($question->type == 'short') {
                $answer = GuestAnswer::where('question_id', $question_id)
                    ->where('invitation_guest_id', $guest->id)
                    ->first();
                $guestData[] = [
                    'question' => $question_id,
                    'answer' => $answer->answer
                ];
            } else {
                $answers = GuestAnswer::where('question_id', $question_id)
                    ->where('invitation_guest_id', $guest->id)
                    ->pluck('answer_id')
                    ->toArray();
                $guestData[] = [
                    'question' => $question_id,
                    'answer' => $answers
                ];
            }
        }
        return $guestData;
    }

    public function getUserTemplateByToken(Request $request)
    {
        $request->validate([
            'user_template_token'         => 'required|exists:user_templates,code',
            'guest_token'                 => 'nullable|exists:invitation_guests,code',
            'host_token'                 => 'nullable|exists:users,hash_code',
        ]);
        $user_template = UserTemplate::where('code', $request->user_template_token)->firstOrFail();
        $guest = null;
        if (request()->guest_token) {
            $guest = InvitationGuests::where(['code' => $request->guest_token, 'user_template_id' => $user_template->id])->firstOrFail();
        }
        $data['user_template'] = UserTemplateResource::make($user_template);
        $data['guest'] = $guest != null ? InvitationGuestsResource::make($guest) : null;

        $data['landing_closed'] = false;

        if ($user_template->templateSetting) {
            $isClosedBySettings = $user_template->templateSetting->close_landing ?? false;
            
            if (!$isClosedBySettings) {
                $hasExpired = $guest && 
                    $guest->sent_at && 
                    $user_template->templateSetting->landing_duration && 
                    Carbon::parse($guest->sent_at)
                        ->addDays($user_template->templateSetting->landing_duration)
                        ->isPast();
                        if($hasExpired){
                            $data = [];
                            $data['landing_closed'] = $hasExpired;
                            $data['event_locale'] = $user_template->locale ?? 'ar';
                        }
            } else {
                $data = [];
                $data['landing_closed'] = true;
                $data['event_locale'] = $user_template->locale ?? 'ar';
            }
        }

        return response()->json([
            'status' => 'success',
            'data' => $data,
            'message' => ''
        ]);
    }

    public function uploadLogo(EventLogoRequest $request)
    {

        $user = auth('api')->user();
        $Logo = Logo::create(['user_id' => $user->id, 'type' => $request->type]);
        $Logo->media()->create(['media' => $request->logo, 'media_type' => 'image', 'option' => $request->type]);

        return LogoResource::make($Logo->fresh())->additional(['status' => 'success', 'message' => 'Uploaded successfully']);
    }

    public function getLogos(Request $request)
    {
        $user = auth('api')->user();
        $Logos = Logo::where(['user_id' => $user->id])->when($request->type, function ($q) use ($request) {
            $q->where('type', $request->type);
        })->latest()->paginate($request->per_page ?? 1000);
        return LogoResource::collection($Logos)->additional(['status' => 'success', 'message' => '']);
    }

    public  function deleteLogo($id)
    {
        $Logo = Logo::where('user_id', auth('api')->id())->findOrFail($id);
        if ($Logo->delete()) {
            if ($Logo->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\Logo', 'app_mediaable_id' => $Logo->id, 'media_type' => 'image'])->first();
                if (file_exists(storage_path('app/public/images/logos/' . $image->media))) {
                    \File::delete(storage_path('app/public/images/logos/' . $image->media));
                }
                $image->delete();
            }
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('api.messages.deleted_successfully')]);
        }
        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.api.delete_fail')], 422);
    }


    public function settings($id)
    {
        $user_template = UserTemplate::where('user_id', auth('api')->id())->findOrFail($id);
        return response()->json([
            'status' => 'success',
            'data' => $user_template->templateSetting,
            'message' => ''
        ]);
    }

    public function updateSettings(TemplateSettingRequest $request, $id)
    {
        try {
            $user_template = UserTemplate::where('user_id', auth('api')->id())
            ->findOrFail($id);

            $settings = $user_template->templateSetting()->updateOrCreate(
            ['user_template_id' => $user_template->id],
            $request->validated()
            );

            return response()->json([
            'status' => 'success',
            'data' => $settings,
            'message' => trans('messages.settings_updated')
            ]);

        } catch (Exception $e) {
            return response()->json([
            'status' => 'error', 
            'message' => trans('messages.update_failed')
            ], 422);
        }
    }

    
}
