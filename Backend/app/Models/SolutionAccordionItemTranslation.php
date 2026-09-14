<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SolutionAccordionItemTranslation extends Model
{
    public $timestamps = false;
    protected $guarded = ['id'];
    protected $casts = ['content_blocks' => 'array'];
}
