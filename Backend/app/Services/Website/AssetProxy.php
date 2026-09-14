<?php

namespace App\Services\Website;

class AssetProxy
{
    /**
     * Rewrites a `/storage/...` URL (as built by `AppMedia::getPathAttribute()`
     * or `asset('storage/...')`) to the CORS-safe `/asset-proxy/...` route
     * (see routes/web.php). Needed wherever the website reads the file via a
     * cross-origin fetch() — e.g. react-inlinesvg inlining an SVG so its
     * fill/stroke stay themeable via CSS — instead of a plain <img src>,
     * which doesn't need CORS at all. `/storage/*` files can't get a CORS
     * header under `php artisan serve` (see the route comment for why); a
     * plain <img>-displayed file (badges, avatars, etc.) should keep using
     * the normal /storage/ URL and never needs this.
     */
    public static function url(?string $storageUrl): ?string
    {
        if (!$storageUrl) {
            return $storageUrl;
        }

        return preg_replace('#/storage/#', '/asset-proxy/', $storageUrl, 1);
    }
}
