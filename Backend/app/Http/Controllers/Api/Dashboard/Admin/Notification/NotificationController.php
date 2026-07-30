<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Notification;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Contact\ClientReplyRequest;
use App\Http\Requests\Api\Dashboard\Admin\Notification\NotificationRequest;
use App\Http\Resources\Api\Dashboard\Admin\Notification\NotificationResource;
use App\Models\User;
use App\Notifications\ManagementNotification;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Notification;

class NotificationController extends Controller
{

    

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $notifications = auth('api')->user()->notifications()->when(request()->type != null, function ($query) {
            if (request()->type == 'read') {
                $query->where('read_at', '!=', null);
            } elseif (request()->type == 'unread') {
                $query->where('read_at', null);
            }
        })->latest()->paginate(20);

        return NotificationResource::collection($notifications)->additional(['status' => 'success', 'message' => '','unread_count' =>$notifications->where('read_at',null)->count()]);
    }

    public function unreadNotificationCount()
    {
        $admins = User::whereIn('user_type', ['admin', 'superadmin'])->pluck('id')->toArray();
        $count = auth('api')->user()->notifications()->where('read_at', null)->count();
        return response()->json(['status' => 'success', 'data' => ['unread' => $count], 'messages' => '']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NotificationRequest $request)
    {
        switch ($request->type) {
            case 'all':
                $users = User::where('id', '!=',  auth('api')->id())->whereIn('user_type', ['client', 'employee'])->get();
                break;
            case 'all_clients':
                $users = User::where('id', '!=',  auth('api')->id())->whereIn('user_type', ['client'])->get();
                break;
            case 'all_employees':
                $users = User::where('id', '!=',  auth('api')->id())->whereIn('user_type', ['employee'])->get();
                break;
            case 'specific':
                $users = User::whereIn('id', $request->user_ids)->get();
                break;
        }

        $pushFcmNotes = [
            'notify_type' => 'management',
            'title'       => $request->title,
            'body'        => $request->body,
        ];

        $database = [
            'sender_data' => User::where('id', auth('api')->id())->select('full_name')->first()->toJson(),
            'notify_type' => 'management',
            'title'       => ['en' => $request->title, 'ar' => $request->title],
            'body'        => ['en' => $request->body, 'ar' => $request->body]
        ];
        Notification::send($users, new ManagementNotification($database));
        // pushFcmNotes($pushFcmNotes, $users->pluck('id')->toArray());
        return response()->json(['status' => 'success', 'data' => null, 'messages' => trans('dashboard.messages.send_successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $superAdmins = User::whereIn('user_type', ['admin', 'supper_admin'])->pluck('id');

        $notification = DatabaseNotification::whereHasMorph('notifiable', [User::class], function ($query) use ($superAdmins) {
            $query->whereIn('notifiable_id', $superAdmins);
        })->findOrFail($id);

        if (!$notification->read_at) {
            $notification->update(['read_at' => now()]);
        }

        return NotificationResource::make($notification)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $superAdmins = User::whereIn('user_type', ['admin', 'supper_admin'])->pluck('id');

        $notification = DatabaseNotification::whereHasMorph('notifiable', [User::class], function ($query) use ($superAdmins) {
            $query->whereIn('notifiable_id', $superAdmins);
        })->findOrFail($id);

        if ($notification->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'messages' => trans('dashboard.messages.success_delete')]);
        }

        return response()->json(['status' => 'fail', 'data' => null, 'messages' => trans('dashboard.messages.something_went_wrong_please_try_again')], 422);
    }
}
