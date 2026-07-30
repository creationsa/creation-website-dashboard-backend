<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class City extends Model implements TranslatableContract
{
    use Translatable;
    protected $guarded = ['id','created_at','updated_at','deleted_at'];
    public $translatedAttributes = ['name'];


    public function country()
    {
    	return $this->belongsTo(Country::class);
    }

    public function users()
    {
    	return $this->hasManyThrough(User::class,Profile::class,'city_id','id','id','user_id');
    }

    public function clients()
    {
    	return $this->hasManyThrough(User::class,Profile::class,'city_id','id','id','user_id')->where('users.user_type','client');
    }

}