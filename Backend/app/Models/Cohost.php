<?php

namespace App\Models;

use Carbon\Carbon;
use App\Observers\CohostObserver;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Cohost extends Model
{
    use Notifiable;

    protected $guarded = ['created_at', 'updated_at'];

    protected static function boot()
    {
        parent::boot();
        Cohost::observe(CohostObserver::class);
    }

    public function getImageAttribute()
    {
        $media = $this->media()->first();
        $image = $media ? asset('storage/images/cohosts/' . $media->media) : asset('assets/images/default/default.jpeg');
        return $image;
    }

    // Relations
    // ========================= Image ===================
    public function media()
    {
        return $this->morphOne(AppMedia::class, 'app_mediaable');
    }

    public function userTemplate()
    {
        return $this->belongsTo(UserTemplate::class);
    }

    
}
