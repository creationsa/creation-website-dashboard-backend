<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class BlogsMainData extends Model implements TranslatableContract
{
    use Translatable;

    protected $table = 'blogs_main_data';
    protected $guarded = ['id', 'created_at', 'updated_at'];
    public $translatedAttributes = ['nav_title'];
}
