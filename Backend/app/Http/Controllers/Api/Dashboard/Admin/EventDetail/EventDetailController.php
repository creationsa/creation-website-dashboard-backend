<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\EventDetail;

use Illuminate\Http\Request;
use App\Models\{EventDetail};
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Dashboard\Admin\EventDetail\EventDetailResource;

class EventDetailController extends Controller
{

    public function index()
    {
        $events = EventDetail::when(request()->keyword, function ($query) {
            $query->where('phone', 'LIKE', '%' . request()->keyword . '%')
            ->orWhere('user_name', 'LIKE', '%' . request()->keyword . '%');
        })->when(request()->from, function ($query) {
            $query->whereDate('event_date', '>=', request()->from);
        })
            ->when(request()->to, function ($query) {
                $query->whereDate('event_date', '<=', request()->to);
            })->latest()->paginate();
        return EventDetailResource::collection($events)->additional(['status' => 'success', 'message' => '']);
    }
    
}
