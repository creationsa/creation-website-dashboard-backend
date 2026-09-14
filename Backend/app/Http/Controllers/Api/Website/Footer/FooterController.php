<?php

namespace App\Http\Controllers\Api\Website\Footer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Website\Footer\FooterResource;
use App\Models\Footer;
use App\Services\Website\LogoResolver;

class FooterController extends Controller
{
    private const RELATIONS = [
        'menuItems', 'menuItems.page', 'menuItems.page.translations',
        'copyrightItems', 'copyrightItems.page', 'copyrightItems.page.translations',
        'socialItems', 'socialItems.settingSocial',
        'badges', 'badges.translations', 'badges.media', 'badges.media.translations',
        'media', 'media.translations',
    ];

    /**
     * Public, read-only projection of the site-wide footer — mirrors the
     * dashboard's admin Footer endpoint but resolved for the current
     * request locale instead of returning both languages.
     *
     * @return \Illuminate\Http\Response
     */
    public function get()
    {
        $footer = Footer::with(self::RELATIONS)->first();

        if (!$footer) {
            $footer = new Footer();
            $footer->setRelation('menuItems', collect());
            $footer->setRelation('copyrightItems', collect());
            $footer->setRelation('socialItems', collect());
            $footer->setRelation('badges', collect());
            $footer->setRelation('media', collect());
        }

        [$logo, $logoAlt] = LogoResolver::resolve();
        $footer->logo = $logo;
        $footer->logo_alt = $logoAlt;

        return FooterResource::make($footer)->additional(['status' => 'success', 'message' => '']);
    }
}
