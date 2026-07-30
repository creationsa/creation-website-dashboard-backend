<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\EmailSubscribtion;

use App\Exports\ExportEmail;
use Illuminate\Http\Request;
use App\Models\{EmailSubscribtion};
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Resources\Api\Dashboard\Admin\EmailSubscribtion\EmailSubscribtionResource;

class EmailSubscribtionController extends Controller
{

    public function index()
    {
        $emails = EmailSubscribtion::when(request()->email, function ($query) {
            $query->where('email', 'LIKE', '%' . request()->email . '%');
        })->when(request()->from, function ($query) {
            $query->whereDate('created_at', '>=', request()->from);
        })
        ->when(request()->to, function ($query) {
            $query->whereDate('created_at', '<=', request()->to);
        })->latest()->paginate();
        return EmailSubscribtionResource::collection($emails)->additional(['status' => 'success', 'message' => '']);
    }

    public function export(Request $request)
    {
        $name = 'email_subscribtions';
        $from = $request->from ? $request->from : '';
        $to = $request->to ? $request->to : '';
        return Excel::download(new ExportEmail($from, $to), $name . '.xlsx');
    }

}
