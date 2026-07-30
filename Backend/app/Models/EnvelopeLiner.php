<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Observers\EnvelopeLinerObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EnvelopeLiner extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected static function boot()
    {
        parent::boot();
        EnvelopeLiner::observe(EnvelopeLinerObserver::class);
    }

    public function getImageAttribute()
    {
        $image = $this->media()->where('option', 'image')->exists() ? 'storage/images/envelope_liners/' . $this->media()->where('option', 'image')->first()->media : 'assets/images/default/default.png';
        return asset($image);
    }

    public function geTthumbnailAttribute()
    {
        $image = $this->media()->where('option', 'thumbnail')->exists() ? 'storage/images/envelope_liners/' . $this->media()->where('option', 'thumbnail')->first()->media : 'assets/images/default/default.png';
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
