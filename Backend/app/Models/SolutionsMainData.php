<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class SolutionsMainData extends Model implements TranslatableContract
{
    use Translatable;

    protected $table = 'solutions_main_data';
    protected $guarded = ['id', 'created_at', 'updated_at'];
    public $translatedAttributes = [
        'first_title', 'second_title', 'third_title',
        'core_desc', 'core_sub_desc',
        'items_header_first_title', 'items_header_second_title', 'items_header_third_title',
        'accordion_items_header_first_title', 'accordion_items_header_second_title', 'accordion_items_header_third_title',
        'nav_title',
    ];

    public function items()
    {
        return $this->hasMany(SolutionMainDataItem::class, 'solutions_main_data_id');
    }

    public function tickerItems()
    {
        return $this->hasMany(SolutionMainDataTickerItem::class, 'solutions_main_data_id');
    }

    public function accordionItems()
    {
        return $this->hasMany(SolutionAccordionItem::class, 'solutions_main_data_id');
    }

    /**
     * The single accordion illustration — reuses the generic AppMedia
     * system (option='accordion_media' [+ 'accordion_media_poster']),
     * same pattern as Project's named media fields.
     */
    public function media()
    {
        return $this->morphMany(AppMedia::class, 'app_mediaable');
    }
}
