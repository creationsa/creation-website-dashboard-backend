<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $guarded = ['created_at', 'updated_at'];

    protected $dates = ['read_at'];

    protected $casts = [
        'read_at' => 'datetime',
    ];

    public function getImageAttribute()
    {
        $image = $this->user ? $this->user->avatar : asset('dashboardAssets/images/cover/cover_sm.png');

        return $image;
    }

    public function scopePublished($query)
    {
        $query->where('created_at', '<', Carbon::now());
    }

    public function scopeReadMessages($query)
    {
        $query->whereNotNull('read_at');
    }

    public function scopeUnReadMessages($query)
    {
        $query->whereNull('read_at');
    }

    public function setUserIdAttribute($value)
    {
        if (auth('api')->check()) {
            $this->attributes['user_id'] = auth('api')->id();
        }
    }

    public function setFullNameAttribute($value)
    {
        if (auth('api')->check() && $value == null) {
            $this->attributes['full_name'] = auth('api')->user()->full_name;
        } else {
            $this->attributes['full_name'] = $value;
        }
    }

    public function setEmailAttribute($value)
    {
        if (auth('api')->check() && $value == null) {
            $this->attributes['email'] = auth('api')->user()->email;
        } else {
            $this->attributes['email'] = $value;
        }
    }

    public function setPhoneAttribute($value)
    {
        if (auth('api')->check() && $value == null) {
            $this->attributes['phone'] = auth('api')->user()->phone;
        } else {
            $this->attributes['phone'] = $value;
        }
    }

    public function setContentAttribute($value)
    {
        // if (auth('api')->check()) {
        //     $this->attributes['full_name'] = auth('api')->user()->full_name;
        //     $this->attributes['user_id']   = auth('api')->id();
        //     $this->attributes['email']     = auth('api')->user()->email;
        //     $this->attributes['phone']     = auth('api')->user()->phone;
        // }
        $this->attributes['content'] = $value;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function replies()
    {
        return $this->hasMany(ContactReply::class);
    }
}
