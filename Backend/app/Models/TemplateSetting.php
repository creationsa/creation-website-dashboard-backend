<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TemplateSetting extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];
    protected $hidden = ['user_template_id', 'created_at', 'updated_at'];
    protected $casts = [
        'close_landing' => 'boolean',
        'send_whatsapp' => 'boolean',
        'send_sms' => 'boolean',
        'send_email' => 'boolean',
        'landing_duration' => 'integer',
        'reminder_attended_duration' => 'integer',
        'reminder_not_attended_duration' => 'integer',
    ];


    public function userTemplate()
    {
        return $this->belongsTo(UserTemplate::class);
    }

    public function getCloseLandingAttribute($value)
    {
        if($value === false && ($this->landing_duration == null || $this->landing_duration == 0)){
            return false;
        }
        return (bool) $value;
    }

    
}
