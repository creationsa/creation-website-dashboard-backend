<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class SolutionMainDataItem extends Model implements TranslatableContract
{
    use Translatable;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    public $translatedAttributes = ['item_title'];

    public function solutionsMainData()
    {
        return $this->belongsTo(SolutionsMainData::class, 'solutions_main_data_id');
    }

    public function media()
    {
        return $this->morphMany(AppMedia::class, 'app_mediaable');
    }

    /**
     * Only meaningful when `source === 'project'` — not a real foreign
     * key (see the migration), so a deleted project just resolves to
     * null instead of blocking the delete or cascading.
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
