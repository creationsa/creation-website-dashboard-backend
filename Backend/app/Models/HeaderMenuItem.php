<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeaderMenuItem extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function header()
    {
        return $this->belongsTo(Header::class);
    }

    public function page()
    {
        return $this->belongsTo(BuilderPage::class, 'page_id');
    }
}
