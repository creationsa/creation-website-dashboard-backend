<?php

namespace App\Casts;

use MatanYadaev\EloquentSpatial\Objects\Point;

class PointCast extends Point
{
    public function toArray(): array
    {
        return [
            'lat' => $this->latitude,
            'lng' => $this->longitude
        ];
    }
}
