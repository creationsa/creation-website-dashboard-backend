<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CohostPoint extends Model
{

    protected $guarded = ['created_at', 'updated_at'];



    public function host()
    {
        return $this->belongsTo(User::class, 'host_id');
    }

    public function cohost()
    {
        return $this->belongsTo(User::class, 'cohost_id');
    }

    
}
