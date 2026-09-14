<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Header extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];
    protected $casts = [
        'show_language_switch' => 'boolean',
        'show_theme_switch' => 'boolean',
    ];

    /**
     * `syncMenuItems()` deletes and recreates all rows on every save in the
     * dashboard's submitted order, so ordering by id reliably reflects
     * that order back out — insertion order alone isn't a guaranteed read
     * order without this.
     */
    public function menuItems()
    {
        return $this->hasMany(HeaderMenuItem::class)->orderBy('id');
    }
}
