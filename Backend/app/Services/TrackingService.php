<?php

namespace App\Services;

class TrackingService
{
    public static function distance($startLat, $startLng, $endLat, $endLng, $unit = "K")
    {
        // $unit = M --> Miles
        // $unit = K --> Kilometers
        // $unit = N --> Nautical Miles

        $startLat = (float) $startLat;
        $startLng = (float) $startLng;
        $endLat = (float) $endLat;
        $endLng = (float) $endLng;

        $theta = $startLng - $endLng;
        $dist = sin(deg2rad($startLat)) * sin(deg2rad($endLat)) + cos(deg2rad($startLat)) * cos(deg2rad($endLat)) * cos(deg2rad($theta));
        $dist = acos($dist);
        $dist = rad2deg($dist);
        $miles = $dist * 60 * 1.1515;
        $unit = strtoupper($unit);

        if ($unit == "K") {
            return ($miles * 1.609344);
        } else if ($unit == "N") {
            return ($miles * 0.8684);
        } else {
            return $miles;
        }
    }
}
