<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class GuestAnswer extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function userTemplate()
    {
        return $this->belongsTo(UserTemplate::class);
    }

    public function answer()
    {
        return $this->belongsTo(Answer::class);
    }

    public function invitationGuest()
    {
        return $this->belongsTo(InvitationGuests::class, 'invitaion_guest_id');
    }

    

}
