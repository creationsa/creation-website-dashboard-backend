<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Observers\LogoObserver;
class Logo extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    
    // protected static function boot()
    // {
    //     parent::boot();
    //     Logo::observe(LogoObserver::class);
    // }

    public function getImageAttribute()
    {
        $image = $this->media()->exists() ? 'storage/images/logos/' . $this->media()->first()->media : 'assets/images/default/default.png';
        return asset($image);
    }

    public function media()
    {
        return $this->morphOne(AppMedia::class, 'app_mediaable');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    

}
