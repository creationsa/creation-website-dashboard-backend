<?php

namespace App\Http\Controllers\Api\Website\Notification;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Website\Notification\NotificationResource;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $notifications = auth('api')->user()->notifications()->latest()->paginate(20);
        $un_read = auth('api')->user()->unreadnotifications->count();
        auth('api')->user()->notifications()->update(['read_at' => now()]);
        return NotificationResource::collection($notifications)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $notification = auth('api')->user()->notifications()->findOrFail($id);
        if (is_null($notification->read_at)) {
            $notification->markAsRead();
        }
        return (new NotificationResource($notification))->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $notification = auth('api')->user()->notifications()->findOrFail($id);
        $notification->delete();
        return response()->json(['status' => 'success', 'data' => null, 'message' => trans('app/client.messages.deleted_successfully')]);
    }

    public function deleteAllNotifications(Request $request)
    {
        auth('api')->user()->notifications()->delete();
        return response(['status' => 'success', 'data' => null, 'message' => trans('app/client.messages.deleted_successfully')]);
    }
}
