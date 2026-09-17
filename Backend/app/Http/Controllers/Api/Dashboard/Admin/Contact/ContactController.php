<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Contact;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Contact\ClientReplyRequest;
use App\Http\Resources\Api\Dashboard\Admin\Contact\ContactResource;
use App\Models\Contact;

class ContactController extends Controller
{
    public function contact_reply(ClientReplyRequest $request, $id)
    {
        $contact = Contact::findOrFail($id);
        try {
            $contact->replies()->create($request->safe()->only('reply') + ['sender_id' => auth('api')->id(), 'receiver_id' => $contact->user_id]);

            $contact->update(['read_at' => now()]);

            return response()->json(['status' => 'success', 'data' => null, 'messages' => trans('Sent successfully')]);
        } catch (\Exception $e) {
            info($e);

            return response()->json(['status' => 'fail', 'data' => null, 'messages' => trans('Something went wrong, please try again')], 422);
        }
    }

    public function index()
    {
        $contacts = Contact::with(['country', 'user', 'replies'])->when(request()->phone, function ($query) {
            $query->where('phone', 'LIKE', '%'.request()->phone.'%');
        })
            ->when(request()->email, function ($query) {
                $query->where('email', 'LIKE', '%'.request()->email.'%');
            })
            ->when(request()->country_id, function ($query) {
                $query->where('country_id', request()->country_id);
            })
            ->when(request()->keyword, function ($query) {
                $query->where(function ($query) {
                    $query->where('phone', 'LIKE', '%'.request()->keyword.'%')
                        ->orWhere('full_name', 'LIKE', '%'.request()->keyword.'%')
                        ->orWhere('email', 'LIKE', '%'.request()->keyword.'%')
                        ->orWhere('company_name', 'LIKE', '%'.request()->keyword.'%')
                        ->orWhere('content', 'LIKE', '%'.request()->keyword.'%');
                });
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
            ->latest()
            ->paginate();

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
        $contact = Contact::with(['country', 'user', 'replies'])->findOrFail($id);
        $contact->update(['read_at' => now()]);

        return ContactResource::make($contact)->additional(['status' => 'success', 'message' => '']);
    }

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
            return response()->json(['status' => 'success', 'data' => null, 'messages' => trans('Deleted successfully')]);
        }

        return response()->json(['status' => 'fail', 'data' => null, 'messages' => trans('Something went wrong, please try again')], 422);
    }
}
