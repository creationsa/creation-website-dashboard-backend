<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class Footer extends Model implements TranslatableContract
{
    use Translatable;

    protected $table = 'footer';
    protected $guarded = ['id', 'created_at', 'updated_at'];
    public $translatedAttributes = [
        'statement_desc', 'statement_image_alt', 'description', 'tagline', 'menu_title', 'social_title',
        'copyright_text',
    ];

    /**
     * `syncMenuItems()` deletes and recreates all rows on every save in the
     * dashboard's submitted order, so ordering by id reliably reflects
     * that order back out — insertion order alone isn't a guaranteed read
     * order without this.
     */
    public function menuItems()
    {
        return $this->hasMany(FooterMenuItem::class)->orderBy('id');
    }

    /**
     * Same reasoning as `menuItems()` — a separate list from the main
     * footer menu, shown in the copyright row.
     */
    public function copyrightItems()
    {
        return $this->hasMany(FooterCopyrightItem::class)->orderBy('id');
    }

    public function socialItems()
    {
        return $this->hasMany(FooterSocialItem::class);
    }

    public function badges()
    {
        return $this->hasMany(FooterBadge::class)->orderBy('slot');
    }

    /**
     * The single statement illustration — reuses the generic AppMedia
     * system (option='statement_image'), same pattern as Project's named
     * media fields.
     */
    public function media()
    {
        return $this->morphMany(AppMedia::class, 'app_mediaable');
    }
}
