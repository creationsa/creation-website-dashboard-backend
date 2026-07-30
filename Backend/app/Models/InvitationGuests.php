<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
    
class InvitationGuests extends Model
{
    use HasFactory, Notifiable;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function guestAnswers()
    {
        return $this->hasMany(GuestAnswer::class, 'invitation_guest_id');
    }

    public function userTemplate()
    {
        return $this->belongsTo(UserTemplate::class, 'user_template_id');
    }

    public function setCodeAttribute()
    {
        $this->attributes['code'] = generate_unique_code(8, '\\App\\Models\\InvitationGuests','code','letters');
    }

    public function addedBy()
    {
        return $this->belongsTo(User::class, 'added_by_id');
    }

    public function answeredByObj()
    {
        return $this->belongsTo(User::class, 'answered_by_id');
    }
}
