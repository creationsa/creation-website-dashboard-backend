<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class Solution extends Model implements TranslatableContract
{
    use Translatable;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    public $translatedAttributes = [
        'title', 'slug',
        'first_title', 'second_title', 'third_title',
        'proposition_title', 'proposition_desc', 'small_description',
        'execution_title',
    ];

    public function executionKeys()
    {
        return $this->hasMany(SolutionExecutionKey::class);
    }

    public function tickerItems()
    {
        return $this->hasMany(SolutionTickerItem::class);
    }

    public function items()
    {
        return $this->hasMany(SolutionItem::class);
    }

    public function metadata()
    {
        return $this->morphOne(Metadata::class, 'metadataable');
    }

    /**
     * Owns exactly one image directly: `card_icon` — the SVG shown on
     * this solution's listing card. The 5 gallery photos belong to
     * `items` instead, each with its own media row.
     */
    public function media()
    {
        return $this->morphMany(AppMedia::class, 'app_mediaable');
    }
}
