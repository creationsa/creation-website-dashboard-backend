<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Observers\EnvelopeStampObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EnvelopeStamp extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    
    protected static function boot()
    {
        parent::boot();
        EnvelopeStamp::observe(EnvelopeStampObserver::class);
    }

    public function getImageAttribute()
    {
        $image = $this->media()->exists() ? 'storage/images/envelope_stamps/' . $this->media()->where('option', 'image')->first()->media : 'assets/images/default/default.png';
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
