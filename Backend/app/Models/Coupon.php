<?php

namespace App\Models;

use App\Observers\CouponObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $dates = ['start_at', 'end_at'];


}
