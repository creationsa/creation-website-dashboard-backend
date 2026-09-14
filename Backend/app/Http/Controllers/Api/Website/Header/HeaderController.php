<?php

namespace App\Http\Controllers\Api\Website\Header;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Website\Header\HeaderResource;
use App\Models\Header;
use App\Services\Website\LogoResolver;

class HeaderController extends Controller
{
    private const RELATIONS = ['menuItems', 'menuItems.page', 'menuItems.page.translations'];

    /**
     * Public, read-only projection of the site-wide header — mirrors the
     * dashboard's admin Header endpoint but resolved for the current
     * request locale instead of returning both languages.
     *
     * @return \Illuminate\Http\Response
     */
    public function get()
    {
        $header = Header::with(self::RELATIONS)->first();

        if (!$header) {
            $header = new Header(['show_language_switch' => true, 'show_theme_switch' => true]);
            $header->setRelation('menuItems', collect());
        }

        [$logo, $logoAlt] = LogoResolver::resolve();
        $header->logo = $logo;
        $header->logo_alt = $logoAlt;

        return HeaderResource::make($header)->additional(['status' => 'success', 'message' => '']);
    }
}
