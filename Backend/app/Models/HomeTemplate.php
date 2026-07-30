<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeTemplate extends Model
{
    protected $guarded = ['id','created_at','updated_at'];


    // Relations
    // ========================= Image ===================

    public function template()
    {
        return $this->belongsTo(Template::class);
    }
}
