<?php

namespace App\Models;

use App\Observers\BlogObserver;
use Illuminate\Database\Eloquent\Model;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BlogItem extends Model implements TranslatableContract
{
    use HasFactory, Translatable;

    public $translatedAttributes = [
        'desc',
    ];
    
    protected $guarded = ['id', 'created_at', 'updated_at'];

    

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}
