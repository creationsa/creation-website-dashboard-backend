<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Observers\UserTemplateObserver;
class Question extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function userTemplate()
    {
        return $this->belongsTo(UserTemplate::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function guestAnswers()
    {
        return $this->hasMany(GuestAnswer::class);
    }

}
