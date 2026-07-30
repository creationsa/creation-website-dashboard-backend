<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class Metadata extends Model implements TranslatableContract
{
    use HasFactory, Translatable;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    public $translatedAttributes = ['title', 'canonical_tags', 'image', 'type', 'description', 'keywords'];
    protected $casts = ['keywords' => 'json'];

    public function getImageAttribute($key)
    {
        $image = $this->translate(app()->getLocale())?->image;
        
        return $image;
    }
}
