<?php

namespace App\Providers;

use App\Casts\{PointCast, PolygonCast};
use App\Channels\{FcmChannel, RedisChannel};
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\ServiceProvider;
use MatanYadaev\EloquentSpatial\EloquentSpatial;
use Mockery\Matcher\Not;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        Notification::extend('fcm', function ($app) {
            return new FcmChannel();
        });

        Notification::extend('redis', function ($app) {
            return new RedisChannel();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // EloquentSpatial::usePolygon(PolygonCast::class);
        // EloquentSpatial::usePoint(PointCast::class);

        Builder::macro('filterByDate', function (string $startDate = null, string $endDate = null, string $column = 'created_at') {

            if ($startDate) $this->whereDate($column, '>=', $startDate);

            if ($endDate) $this->whereDate($column, '<=', $endDate);

            return $this;
        });

        \Carbon\Carbon::setLocale(LC_TIME, app()->getLocale());

        view()->composer([
            'dashboard.layout.sidebar'
        ], function ($view) {
            $view->with('locale', app()->getLocale());
        });

        view()->composer([
            'dashboard.layout.header',
            'dashboard.layout.script'
        ], function ($view) {
            $view->with('notifications', auth()->check() ? auth('api')->user()->unreadnotifications()->paginate(50) : null);
        });
    }
}
