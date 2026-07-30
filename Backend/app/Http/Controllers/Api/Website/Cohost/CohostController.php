<?php

namespace App\Http\Controllers\Api\Website\Cohost;

use Exception;
use App\Services\SMSService;
use Illuminate\Http\Request;
use App\Services\GmailService;
use App\Http\Controllers\Controller;
use App\Notifications\MinPointNotification;
use App\Notifications\CohostDatabseNotification;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Http\Resources\Api\Website\Cohost\CohostResource;
use App\Http\Resources\Api\Website\User\UserIndexResource;
use App\Http\Resources\Api\Website\UserTemplate\UserTemplateResource;
use App\Models\{User, Cohost, CohostPoint, PointHistory, UserTemplate};
use App\Notifications\{CohostNotification, SendPointNotification, AcceptRequestNotification};
use App\Http\Requests\Api\Website\Cohost\{CohostRequest, SendPointRequest,ChangeStatusRequest};

class CohostController extends Controller
{
    protected $gmailService;
    
    public function __construct(GmailService $gmailService)
    {
        $this->gmailService = $gmailService;
    }

    public function redirectToGoogle()
    {
        return redirect()->away($this->gmailService->getAuthUrl());
    }

    public function handleGoogleCallback(Request $request)
    {
        $this->gmailService->fetchAccessTokenWithAuthCode($request->get('code'));
        return redirect('/gmail/send');
    }
    
    public function index(Request $request)
    {
        $cohosts = Cohost::whereHas('userTemplate',function($q) {
            $q->where('user_id', auth()->id());
        })->when(request()->keyword, function ($query) {
            $query->where(function ($query) {
                $query->where('name', 'like', '%' . request()->keyword . '%')
                    ->orWhere('phone', 'like', '%' . request()->keyword . '%')
                    ->orWhere('email', 'like', '%' . request()->keyword . '%');
            });
        })->latest()->paginate($request->per_page);

        return CohostResource::collection($cohosts)->additional([
            'status' => 'success',
            'message' => '',
        ]);
    }

    public function cohostWithoutPaginate(Request $request)
    {
        $cohosts = Cohost::whereHas('userTemplate', function ($q) {
            $q->where('user_id', auth()->id());
        })->pluck('email')->toArray();

        $emails = array_unique($cohosts);
        $users = User::whereIn('email',$emails)->get();

        return UserIndexResource::collection($users)->additional([
            'status' => 'success',
            'message' => '',
        ]);
    }

    public function store(CohostRequest $request)
    {
        if (isset($request->phone) && (substr($request->phone, 0, 1) != '5' || substr($request->phone, 0, 1) != '05')) {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.worng_phone_format')], 422);
        }

        $cohost = Cohost::create($request->validated()+['add_guests' => isset($request->number_of_guests) ? $request->number_of_guests : 0]);
        if($request->email && $request->email != ''){
            $user = User::where(['email' => $request->email])->first();

            $data['url']  =  env('APP_URL'). '/profile/co-host/requests';
            $data['name']  =  $cohost->name;
            $data['event_name']  =  $cohost->userTemplate->title;
            $data['date']  =  now()->toFormattedDateString();
            $gmailService = new GmailService();
            $htmlBody = view('emails.cohost', compact('data'))->render();
            $gmailService->sendEmailViaGmailApi($request->email, $htmlBody, 'Cohost Invitation');
            // $cohost->notify(new CohostNotification($data, $cohost->email, ['mail']));
        }else{
            $user = User::where(['phone' => $request->phone])->first();
            $message = "Hello " . $cohost->name . ", You have been invited as a co-host to this invitation " . $cohost->userTemplate->title . "Check this URL: " . env('APP_URL'). '/profile/co-host/requests';
            $phone   =  $cohost->phone;
            SMSService::sendFccSMS($message, $phone);
        }
        if($user){
            $cohost->update(['user_id' => $user->id]);
            $user->notify(new CohostDatabseNotification($data, ['database']));
        }
        
        return response()->json(['status' => 'success', 'data' => CohostResource::make($cohost->fresh()), 'message' => 'Cohost was added succesfully']);
    }

    public function show($id)
    {
        $cohosts = Cohost::findOrFail($id);

        return CohostResource::make($cohosts)->additional([
            'status' => 'success',
            'message' => '',
        ]);
    }

    public function update(CohostRequest $request, $id)
    {
        $cohost = Cohost::where(['status' => 'pending'])->findOrFail($id);
        $cohost->update(array_except($request->validated(), 'user_template_ids'));
        // $cohost->userTemplates()->sync($request->user_template_ids);
        return response()->json(['status' => 'success', 'data' => CohostResource::make($cohost), 'message' => 'Cohost was added succesfully']);
    }

    public function destroy($id)
    {
        $guest = Cohost::findOrFail($id);
        if ($guest->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('dashboard/admin.actions.deleted_successfully')]);
        }
        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.api.delete_fail')], 422);
    }

    public function receivedTemplates(Request $request)
    {
        $user_template_ids = Cohost::where(['email' => auth()->user()->email, 'status' => 'accepted'])->pluck('user_template_id')->toArray();
        $templates = UserTemplate::whereIn('id', $user_template_ids)->latest()->paginate($request->per_page);
        return UserTemplateResource::collection($templates)->additional([
            'status' => 'success',
            'message' => '',
        ]);
    }

    public function cohostRequests(Request $request)
    {
        $cohosts = Cohost::where(['email' => auth()->user()->email])->latest()->paginate($request->per_page);

        return CohostResource::collection($cohosts)->additional([
            'status' => 'success',
            'message' => '',
        ]);
    }

    public function changeStatus(ChangeStatusRequest $request, $id)
    {
        $auth = auth()->user();
        $cohost = Cohost::where(['email' => $auth->email, 'id' => $id, 'status' => 'pending'])->firstOrFail();
        $cohost->update(['user_id' => $auth->id, 'status' => $request->status]);

        $data['host_name']  =  $cohost->userTemplate->user->full_name;
        $data['name']  =  $auth->full_name;
        $data['status']  =  $request->status;
        $data['event_name']  =  $cohost->userTemplate->title;
        $data['date']  =  now()->toFormattedDateString();
        $gmailService = new GmailService();
        $htmlBody = view('emails.accept_request', compact('data'))->render();
        $gmailService->sendEmailViaGmailApi($cohost->email, $htmlBody, 'Cohost Invitation');
        $cohost->userTemplate->user->notify(new AcceptRequestNotification($data, $cohost->userTemplate->user->email, ['database']));

        return response()->json(['status' => 'success', 'data' => CohostResource::make($cohost->fresh()), 'message' => 'Status changed succesfully']);
    }

    public function sendPoints(SendPointRequest $request)
    {
        $auth = auth()->user();
        $user = User::whereEmail($request->email)->firstOrFail();

        $cohost = Cohost::where('email', $user->email)->firstOrFail();

        if($cohost->userTemplate->user_id != $auth->id) return response()->json(['status' => 'fail', 'data' => null, 'message' => 'this co host is not yours'],422);
        if ($request->points > $auth->points) return response()->json(['status' => 'fail', 'data' => null, 'message' => 'you have not enough points to send'], 422);
        
        $cohost_points = CohostPoint::where(['host_id' => $auth->id, 'cohost_id' => $user->id])->first();
        if($cohost_points){
            $cohost_points->increment('points',$request->points);
        }else{
            $cohost_points = CohostPoint::create($request->validated() + ['host_id' => $auth->id, 'cohost_id' => $user->id]);
        }
        $auth->decrement('points' , $request->points);
        $point_history = PointHistory::create($request->validated() + ['host_id' => $auth->id,'cohost_id' => $user->id]);

        $data['host_name']  =  $auth->full_name;
        $data['name']  =  $user->full_name;
        $data['url']  =  env('APP_URL'). '/manage'.'/'.$cohost->user_template_id;
        $data['points']  =  $request->points;
        $data['date']  =  now()->toFormattedDateString();

        $gmail = new GmailService();
        $htmlBody = view('emails.send_point', compact('data'))->render();
        $gmail->sendEmailViaGmailApi($user->email, $htmlBody, 'Send Points');
        $user->notify(new SendPointNotification($data, $user->email, ['database']));
        $auth->fresh();
        if($auth->points <= 25){
            $auth->notify(new MinPointNotification(['database']));
        }

        return response()->json(['status' => 'success', 'data' => null, 'message' => 'Points Sent succesfully']);
    }

    
}
