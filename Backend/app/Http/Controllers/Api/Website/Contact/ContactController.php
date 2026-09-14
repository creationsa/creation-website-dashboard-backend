<?php

namespace App\Http\Controllers\Api\Website\Contact;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Website\Contact\ContactRequest;
use App\Models\Contact;
use App\Models\User;
use App\Notifications\Contact\ContactNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class ContactController extends Controller
{
    public function contact(ContactRequest $request)
    {
        $contact = Contact::create($request->validated());
        $admins = User::whereIn('user_type',['admin','super_admin'])->get();
        Notification::send($admins, new ContactNotification($contact));
        return response()->json(['status' => 'success', 'data' => null, 'message' => trans('Your message has been sent successfully')]);
    }
}
