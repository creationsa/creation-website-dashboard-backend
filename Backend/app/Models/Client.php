<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class Client extends Model implements TranslatableContract
{
    use Translatable;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    public $translatedAttributes = ['title'];

    /**
     * The single source of truth for client/partner logos, reused
     * wherever a "Logos" section is placed (page builder, projects
     * landing page, ...) — one AppMedia row per logo, tagged option='logo'.
     */
    public function logos()
    {
        return $this->morphMany(AppMedia::class, 'app_mediaable')->where('option', 'logo');
    }
}
