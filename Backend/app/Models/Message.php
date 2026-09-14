<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at', 'deleted_at'];

    public function chat()
    {
        return $this->belongsTo(Chat::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getMessageAttribute()
	{
        if (in_array($this->message_type,['sound','file'])) {
			return asset('storage/files/chats/'.$this->attributes['message']);
		}elseif ($this->message_type == 'image') {
            return asset('storage/images/chats/'.$this->attributes['message']);
		}else{
			return $this->attributes['message'] ?? '';
		}
	}
}
