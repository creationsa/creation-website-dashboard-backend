<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];
    protected $dates = ['last_login_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function scopeNearest($query, $latitude, $longitude)
    {
        return $query->whereRaw("ST_Distance_Sphere(point(lng, lat), point(?, ?)) / 1000  <= ?", [$longitude, $latitude, setting('radius') != false ? setting('radius') : 5]);
    }

    public function getGeoLocationAttribute()
    {
        return [
            'lat' => (float) $this->lat,
            'lng' => (float) $this->lng,
            'location' => $this->location
        ];
    }
}
