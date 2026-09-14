<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SolutionItem extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function solution()
    {
        return $this->belongsTo(Solution::class);
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
