<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class SolutionAccordionItem extends Model implements TranslatableContract
{
    use Translatable;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    public $translatedAttributes = ['title', 'content_blocks'];

    public function solutionsMainData()
    {
        return $this->belongsTo(SolutionsMainData::class, 'solutions_main_data_id');
    }
}
