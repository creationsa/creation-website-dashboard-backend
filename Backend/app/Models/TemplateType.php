<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Template;


class TemplateType extends Model
{
    use HasFactory;

    public function templates()
    {
        return $this->hasMany(Template::class);
    }
}
