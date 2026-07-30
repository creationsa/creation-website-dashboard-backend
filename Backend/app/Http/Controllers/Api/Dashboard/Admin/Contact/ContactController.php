<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Contact;

use App\Http\Controllers\Controller;
use App\Models\{Contact, User};
use App\Http\Resources\Api\Dashboard\Admin\Contact\ContactResource;
use App\Http\Requests\Api\Dashboard\Admin\Contact\{ClientReplyRequest, ContactReplyRequest};
use App\Mail\Contac;
use App\Mail\ContactMail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Mail;
use App\Notifications\ManagementNotification;
use Illuminate\Http\Request;
use App\Notifications\Admin\{ReplayContactNotification};


class ContactController extends Controller
{



    public function contact_reply(ClientReplyRequest $request, $id)
    {
        $contact = Contact::findOrFail($id);

        try {
            $reply = $contact->replies()->create($request->safe()->only('reply') + ['sender_id' => auth('api')->id(), 'receiver_id' => $contact->user_id]);

            // if($contact->user) {
            //     Notification::send($contact->user, new ReplayContactNotification($contact->id, $reply->id, ['database', 'fcm']));
            // }

            $contact->update(['read_at' => now()]);

            return response()->json(['status' => 'success', 'data' => null, 'messages' => trans('general.messages.send_successfully')]);

        } catch (\Exception $e) {
            info($e);
            return response()->json(['status' => 'fail', 'data' => null, 'messages' => trans('general.messages.error_occurred_please_try_again_later')], 422);
        }
    }

    
    public function index()
    {
        $contacts = Contact::when(request()->phone, function ($query) {
            $query->where('phone', 'LIKE', '%' . request()->phone . '%');
        })
        ->when(request()->email, function ($query) {
            $query->where('email', 'LIKE', '%' . request()->email . '%');
        })
        ->when(request()->keyword, function ($query) {
            $query->where('phone', 'LIKE', '%' . request()->keyword . '%')
            ->orWhere('full_name', 'LIKE', '%' . request()->keyword . '%')
            ->orWhere('email', 'LIKE', '%' . request()->keyword . '%')
            ->orWhere('title', 'LIKE', '%' . request()->keyword . '%')
            ->orWhere('content', 'LIKE', '%' . request()->keyword . '%');
        })
        ->when(request()->from, function ($query) {
            $query->whereDate('created_at', '>=', request()->from);
        })
        ->when(request()->to, function ($query) {
            $query->whereDate('created_at', '<=', request()->to);
        })
        ->when(request()->status == 'read', function ($query) {
            $query->where('read_at', '!=', null);
        })
        ->when(request()->status == 'unread', function ($query) {
            $query->where('read_at', null);
        })
        ->when(request()->user_id, function ($query) {
            $query->where('user_id', request()->user_id);
        })
        ->latest()->paginate();
        return ContactResource::collection($contacts)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $contacts = Contact::findOrFail($id);
        $contacts->update(['read_at' => now()]);
        return ContactResource::make($contacts)->additional(['status' => 'success', 'message' => '']);
    }

    // public function reply(ContactReplyRequest $request, $id)
    // {
    //     $contact = Contact::findOrFail($id);
    //     try {
    //         $contact->replies()->create($request->safe()->only('reply') + ['sender_id' => auth('api')->id(), 'receiver_id' => $contact->user_id]);

    //         switch ($request->send_vai) {
    //             case 'sms':
    //                 // if (setting('use_sms_service') == 'enable') {
    //                 // }
    //                 // send_sms($contact->user->phone_code . validateIfPhoneStartWithZero($contact->user->phone), $request->reply);
    //                 //  send_smsForReply( validateIfPhoneStartWithZero($contact->user->phone), $request->reply);

    //                 break;
    //             case 'email':
    //                 Mail::to($contact->email)->send(new ContactMail($request->reply));
    //                 // Mail::send([], [], function ($message) use ($contact, $request) {
    //                 //     $message->to($contact->email)->subject(trans('dashboard/dashboard.messages.reply_contact_msg'))->setBody($request->reply, 'text/html');
    //                 // });
    //                 break;
    //         }

    //         $contact->update(['read_at' => now()]);
    //         return response()->json(['status' => 'success', 'data' => null, 'messages' => trans('general.messages.send_successfully')]);
    //     } catch (\Exception $e) {
    //         info($e);
    //         return response()->json(['status' => 'fail', 'data' => null, 'messages' => trans('general.messages.error_occurred_please_try_again_later')], 422);
    //     }
    // }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);

        if ($contact->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'messages' => trans('dashboard.messages.success_delete')]);
        }

        return response()->json(['status' => 'fail', 'data' => null, 'messages' => trans('general.messages.error_occurred_please_try_again_later')], 422);
    }
}
