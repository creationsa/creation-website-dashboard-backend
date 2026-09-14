<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model implements TranslatableContract
{
    use HasFactory, Translatable;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    public $translatedAttributes = [
        'title', 'slug',
        'first_title', 'second_title', 'third_title',
        'overview_description',
        'stats_title', 'stat_one_label', 'stat_two_label', 'stat_three_label',
    ];

    public const MEDIA_FIELDS = [
        'first_cover_media', 'second_cover_media',
        'first_media', 'second_media', 'third_media', 'fourth_media',
        'fifth_media', 'sixth_media', 'seventh_media', 'eighth_media',
    ];

    public function tickerItems()
    {
        return $this->hasMany(ProjectTickerItem::class);
    }

    public function media()
    {
        return $this->morphMany(AppMedia::class, 'app_mediaable');
    }

    public function metadata()
    {
        return $this->morphOne(Metadata::class, 'metadataable');
    }
}
