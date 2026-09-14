<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterSocialItem extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function footer()
    {
        return $this->belongsTo(Footer::class);
    }

    public function settingSocial()
    {
        return $this->belongsTo(SettingSocial::class);
    }
}
