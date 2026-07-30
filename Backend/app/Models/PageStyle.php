<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Observers\PageStyleObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PageStyle extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    
    protected static function boot()
    {
        parent::boot();
        PageStyle::observe(PageStyleObserver::class);
    }

    public function getFileAttribute()
    {
        $image = $this->media()->exists() ? 'storage/files/page_styles/' . $this->media()->where('option', 'file')->first()->media : 'assets/images/default/default.png';
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

    public function pageStyleStyles()
    {
        return $this->hasMany(PageStyleStyle::class, 'page_style_id');
    }
}
