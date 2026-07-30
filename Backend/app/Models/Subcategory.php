<?php

namespace App\Models;

use App\Observers\SubcategoryObserver;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;


class Subcategory extends Model implements TranslatableContract
{
    use Translatable;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    public $translatedAttributes = ['name', 'description'];

    protected static function boot()
    {
        parent::boot();
        Subcategory::observe(SubcategoryObserver::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function getBigImageAttribute()
    {
        $image = $this->media()->where("option", "big_image")->exists() ? 'storage/images/subcategories/' . $this->media()->where("option", "big_image")->first()->media : 'assets/images/default/default.png';
        return asset($image);
    }

    public function getSmallImageAttribute()
    {
        $image = $this->media()->where("option", "small_image")->exists() ? 'storage/images/subcategories/' . $this->media()->where("option", "small_image")->first()->media : 'assets/images/default/default.png';
        return asset($image);
    }

    public function getCategoryId() {
        $category = $this->category()->first();
        return $category ? $category->id : null;
    }

    public function media()
    {
        return $this->morphOne(AppMedia::class, 'app_mediaable');
    }
}
