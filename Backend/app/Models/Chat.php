<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at', 'deleted_at'];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }

    public function getLastMessageModelAttribute()
	{
		if (in_array($this->message_type,['sound','file'])) {
			return asset('storage/files/chats/'.$this->attributes['last_message']);
		}elseif ($this->message_type == 'image') {
            return asset('storage/images/chats/'.$this->attributes['last_message']);
		}else{
			return $this->attributes['last_message'] ?? '';
		}
	}
}
