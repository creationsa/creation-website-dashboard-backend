<?php

namespace App\Casts;

use MatanYadaev\EloquentSpatial\Objects\Polygon;

class PolygonCast extends Polygon
{
    public function toArray(): array
    {
        return array_map(function ($point) {
            return [
                'lat' => $point[1],
                'lng' => $point[0]
            ];
        }, $this->getCoordinates()[0]);
    }
}
