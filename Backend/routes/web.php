<?php

use Illuminate\Support\Facades\Route;

// Local-dev-only CORS proxy for assets that get read via cross-origin
// fetch() (e.g. the Website's react-inlinesvg inlining the logo SVG so its
// fill/stroke stay themeable via CSS). Deliberately NOT under /storage/:
// `php artisan serve`'s built-in PHP server, for any URI that resolves to a
// real file (which /storage/* always does, via the public/storage symlink),
// sets SCRIPT_NAME to that file's path before the router script even runs —
// this breaks Symfony's path-info parsing and makes Laravel resolve the
// request as "/" regardless of what the router or config/cors.php says, so
// a route matching /storage/{path} can never actually be reached under this
// dev server. Since no real file/symlink exists under /asset-proxy/, that
// quirk never triggers here. Real Apache deployments don't need this at
// all — storage/app/public/.htaccess already gives /storage/* files a CORS
// header directly. Only LogoResolver uses this path; every other upload
// (badges, statement image, etc.) is read via a plain <img src>, which
// doesn't need CORS and keeps using the normal /storage/* URL.
Route::get('/asset-proxy/{path}', function (string $path) {
    $fullPath = storage_path('app/public/'.$path);

    abort_unless(is_file($fullPath), 404);

    return response()->file($fullPath, ['Access-Control-Allow-Origin' => '*']);
})->where('path', '.*');