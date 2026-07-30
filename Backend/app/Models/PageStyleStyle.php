<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Observers\FontObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PageStyleStyle extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    
    public function pageStyle() 
    {
        return $this->belongsTo(PageStyle::class);
    }
}
