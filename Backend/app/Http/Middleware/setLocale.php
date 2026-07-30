<?php

namespace App\Http\Middleware;

use Closure;
use Carbon\Carbon;
class setLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $rquest_language = $request->header('Accept-Language');
        $locales         = config('translatable.locales');
        $defualt_locale  = config('translatable.defualt_locale');


        $rquest_language && in_array($rquest_language, $locales) ? app()->setLocale($rquest_language) : app()->setLocale($defualt_locale);
        
        return $next($request);
    }
}
