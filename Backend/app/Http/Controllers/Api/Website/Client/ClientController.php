<?php

namespace App\Http\Controllers\Api\Website\Client;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Services\Website\AssetProxy;

class ClientController extends Controller
{
    /**
     * The "Clients" section (shown as "Network" on the website) — a
     * singleton title plus its logos, same shape/pattern as About/Header/
     * Footer. Logos are always SVGs, inlined client-side (react-inlinesvg,
     * see Website/src/components/ui/DynamicSvg.tsx) so their color follows
     * the site's theme — that cross-origin fetch is exactly what
     * `AssetProxy` exists for (a plain `/storage/...` URL can't get a CORS
     * header under `php artisan serve`, only the real Apache server).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function get()
    {
        $locale = app()->getLocale();
        $client = Client::with(['translations', 'logos.translations'])->first();

        $logos = $client
            ? $client->logos->map(fn ($logo) => [
                'image' => AssetProxy::url($logo->path),
                'alt' => (string) $logo->translate($locale)?->alt,
            ])->values()
            : [];

        return response()->json([
            'data' => [
                'title' => $client?->translate($locale)?->title,
                'logos' => $logos,
            ],
            'status' => 'success',
            'message' => '',
        ]);
    }
}
