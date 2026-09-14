<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class FooterBadge extends Model implements TranslatableContract
{
    use Translatable;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    public $translatedAttributes = ['label'];

    public function footer()
    {
        return $this->belongsTo(Footer::class);
    }

    public function media()
    {
        return $this->morphMany(AppMedia::class, 'app_mediaable');
    }
}
