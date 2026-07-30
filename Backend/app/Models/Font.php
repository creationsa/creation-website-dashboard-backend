<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Observers\FontObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Font extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    
    protected static function boot()
    {
        parent::boot();
        Font::observe(FontObserver::class);
    }

    public function getFileAttribute()
    {
        $image = $this->media()->exists() ? 'storage/files/fonts/' . $this->media()->where('option', 'file')->first()->media : 'assets/images/default/default.png';
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

    public function fontStyles()
    {
        return $this->hasMany(FontStyle::class, 'font_id');
    }
}
