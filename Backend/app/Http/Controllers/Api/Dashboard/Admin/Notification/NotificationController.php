<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Notification;

use App\Models\User;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Notification;
use Illuminate\Notifications\DatabaseNotification;
use App\Notifications\Api\Dashboard\ManagementNotification;
use App\Http\Requests\Api\Dashboard\Admin\Notification\NotificationRequest;
use App\Http\Resources\Api\Dashboard\Admin\Notification\NotificationResource;
use App\Http\Requests\Api\Dashboard\Admin\Notification\PrivateNotificationRequest;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $notifications = auth('api')->user()->notifications()->whereNull('process_id')->when(request()->type != null, function ($query) {
            if (request()->type == 'read') {
                $query->where('read_at', '!=', null);
            } elseif (request()->type == 'unread') {
                $query->where('read_at', null);
            }
        })->latest()->paginate(20);

        return NotificationResource::collection($notifications)->additional(['status' => 'success', 'message' => '', 'unread_count' => $notifications->where('read_at', null)->count()]);
    }

    public function sentNotifications()
    {
        $user = auth('api')->user();

        $notifications = $user->notifications()->where('process_id', '!=', null)
            ->when(request()->type != null, function ($query) {
                if (request()->type == 'read') {
                    $query->where('read_at', '!=', null);
                } elseif (request()->type == 'unread') {
                    $query->where('read_at', null);
                }
            })->latest()->paginate(20);

        return NotificationResource::collection($notifications)
            ->additional(['status' => 'success', 'message' => '']);
    }


    public function unreadNotificationCount()
    {
        $admins = User::whereIn('user_type', ['admin', 'superadmin'])->pluck('id')->toArray();
        $count = auth('api')->user()->notifications()->whereNull('process_id')->where('read_at', null)->count();
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
        $user = auth('api')->user();
        switch ($request->type) {
            case 'all':
                $users = User::where('id', '!=',  $user->id)->get();
                break;
            case 'super_admin':
                $users = User::where('id', '!=',  $user->id)->whereIn('user_type', ['super_admin'])->get();
                break;
            case 'admins':
                $users = User::where('id', '!=',  $user->id)->whereIn('user_type', ['admin'])->get();
                break;
            case 'clients':
                $users = User::where('id', '!=',  $user->id)->whereIn('user_type', ['client'])->get();
                break;
            case 'drivers':
                $users = User::where('id', '!=',  $user->id)->whereIn('user_type', ['driver'])->get();
                break;
            case 'agents':
                $users = User::where('id', '!=',  $user->id)->whereIn('user_type', ['agent'])->get();
                break;
            case 'specific':
                $users = User::where('id', '!=',  $user->id)->whereIn('id', $request->user_ids)->get();
                break;
        }

        $database = [
            'notify_type' => 'management',
            'title'       => ['en' => $request->en['title'], 'ar' => $request->ar['title']],
            'body'        => ['en' => $request->en['body'], 'ar' => $request->ar['body']],
            'sender_data' => User::where('id', $user->id)->select('full_name', 'id')->first()->toJson(),
            'process_id'  => uniqid(),
        ];
        
        $user->notifications()->create([
            'id'             => Str::uuid(),
            'type'           => \App\Notifications\Api\Dashboard\ManagementNotification::class,
            'notifiable_type'=> get_class($user),
            'notifiable_id'  => $user->getKey(),
            'process_id'     => uniqid(),
            'data'           => (new ManagementNotification($database, ['database']))
                                ->toDatabase($user),
        ]);

        Notification::send($users, new ManagementNotification($database, ['database', 'fcm']));

        return response()->json(['status' => 'success', 'data' => null, 'messages' => trans('Sent successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $superAdmins = User::whereIn('user_type', ['admin', 'super_admin'])->pluck('id');

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
        $superAdmins = User::whereIn('user_type', ['admin', 'super_admin'])->pluck('id');

        $notification = DatabaseNotification::whereHasMorph('notifiable', [User::class], function ($query) use ($superAdmins) {
            $query->whereIn('notifiable_id', $superAdmins);
        })->findOrFail($id);

        if ($notification->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'messages' => trans('Deleted successfully')]);
        }

        return response()->json(['status' => 'fail', 'data' => null, 'messages' => trans('Something went wrong, please try again')], 422);
    }

    public function deleteAllNotifications()
    {
        $superAdmins = User::whereIn('user_type', ['admin', 'super_admin'])->pluck('id');

        $notifications = DatabaseNotification::whereHasMorph('notifiable', [User::class], function ($query) use ($superAdmins) {
            $query->whereIn('notifiable_id', $superAdmins);
        });

        if ($notifications->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'messages' => trans('All sent notifications deleted successfully')]);
        }

        return response()->json(['status' => 'fail', 'data' => null, 'messages' => trans('Something went wrong, please try again')], 422);
    }
}
