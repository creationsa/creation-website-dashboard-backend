<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use MatanYadaev\EloquentSpatial\Objects\LineString;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\Objects\Polygon;

class City extends Model implements TranslatableContract
{
    use Translatable;

    protected $guarded = ['id', 'created_at', 'updated_at', 'deleted_at'];

    public $translatedAttributes = ['name'];

    protected $casts = [
        'location' => Point::class,
        'area'     => Polygon::class,
    ];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function users()
    {
        return $this->hasManyThrough(User::class, Profile::class, 'city_id', 'id', 'id', 'user_id');
    }

    public function clients()
    {
        return $this->hasManyThrough(User::class, Profile::class, 'city_id', 'id', 'id', 'user_id')
            ->where('users.user_type', 'client');
    }

    /**
     * Get polygon area as an array of [lat, lng].
     *
     * @return array
     */
    public function getAreaCoordinates(): array
    {
        $polygon = $this->area;

        if (!$polygon instanceof Polygon) {
            return [];
        }

        $rings = $polygon->toArray();

        if (!isset($rings['coordinates'][0]) || empty($rings['coordinates'][0])) {
            return [];
        }

        return collect($rings['coordinates'][0])->map(function ($point) {
            return [
                'lat' => $point[1],
                'lng' => $point[0],
            ];
        })->toArray();
    }
}
