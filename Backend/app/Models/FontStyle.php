<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Observers\FontObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FontStyle extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    
    public function font() 
    {
        return $this->belongsTo(Font::class);
    }
}
