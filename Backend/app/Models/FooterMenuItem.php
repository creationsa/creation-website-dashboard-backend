<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterMenuItem extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function footer()
    {
        return $this->belongsTo(Footer::class);
    }

    public function page()
    {
        return $this->belongsTo(BuilderPage::class, 'page_id');
    }
}
