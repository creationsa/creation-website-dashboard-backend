<?php

namespace App\Models;

use App\Observers\BackdropObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Backdrop extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected static function boot()
    {
        parent::boot();
        Backdrop::observe(BackdropObserver::class);
    }

    public function getImageAttribute()
    {
        $image = $this->media()->where('option', 'image')->exists() ? 'storage/images/backdrops/' . $this->media()->where('option', 'image')->first()->media : 'assets/images/default/default.png';
        return asset($image);
    }

    public function getThumbnailAttribute()
    {
        $image = $this->media()->where('option', 'thumbnail')->exists() ? 'storage/images/backdrops/' . $this->media()->where('option', 'thumbnail')->first()->media : 'assets/images/default/default.png';
        return asset($image);
    }

    public function scopeActive($query)
    {
        $query->where(['is_active' => true]);
    }

    public function media()
    {
        return $this->morphOne(AppMedia::class, 'app_mediaable');
    }
}
