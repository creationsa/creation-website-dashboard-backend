<?php

namespace App\Http\Controllers\Api\General;

use App\Http\Controllers\Controller;
use App\Models\{Blog, Service};
use Illuminate\Http\Request;

class SitemapController extends Controller
{
    public function __invoke()
    {
        $blogs    = Blog::select('id', 'updated_at')->with('translations')->orderBy('updated_at', 'desc')->get();

        $services = Service::select('id', 'updated_at')->with('translations')->orderBy('updated_at', 'desc')->get();
        $map      = [];
        $default_lang = 'ar';

        $blogs->each(function ($blog) use (&$map, $default_lang) {
            $this->generateUrl($map, 'blogs', $blog, $default_lang);
        });

        $services->each(function ($service) use (&$map, $default_lang) {
            $this->generateUrl($map, 'services', $service, $default_lang);
        });

        return response()->json([
            'status'  => 'success',
            'data'    => $map,
            'message' => ''
        ]);
    }

    public function generateUrl(&$map, $type, $content, $default_lang) {
        $url = null;
        foreach (config('translatable.locales') as $locale) {
            $slug = $content->translate($locale)->slug;
            if ($locale != $default_lang) {
                $url = "/$locale/$type/$slug";
            } else {
                $url = "/$type/$slug";
            }

            array_push($map, ['url' => $url, 'updated_at' => $content->updated_at]);
        }
    }
}
