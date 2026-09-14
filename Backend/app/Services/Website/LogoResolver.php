<?php

namespace App\Services\Website;

use App\Models\Setting;

class LogoResolver
{
    private const LOGO_KEYS = [
        'logo_en', 'logo_en_alt_en', 'logo_en_alt_ar',
        'logo_ar', 'logo_ar_alt_en', 'logo_ar_alt_ar',
    ];

    /**
     * `logo_en`/`logo_ar` are two independent logo images (not just alt
     * text variants) — resolve the one matching the current locale, with
     * its matching-locale alt text. Shared by every website-facing
     * resource that displays the site logo (Header, Footer, ...).
     *
     * @return array{0: ?string, 1: string} [$logoUrl, $logoAlt]
     */
    public static function resolve(): array
    {
        $rows = Setting::whereIn('key', self::LOGO_KEYS)->get(['key', 'value'])->keyBy('key');
        $isAr = app()->getLocale() === 'ar';

        $filename = $isAr ? ($rows['logo_ar']->value ?? null) : ($rows['logo_en']->value ?? null);
        $logo = $filename ? AssetProxy::url(asset('storage/images/settings/' . $filename)) : null;

        $alt = $isAr
            ? ($rows['logo_ar_alt_ar']->value ?? '')
            : ($rows['logo_en_alt_en']->value ?? '');

        return [$logo, $alt];
    }
}
