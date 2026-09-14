<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GoogleMapService
{
    private $apiKey;

    public function __construct()
    {
        $this->apiKey = env('GOOGLE_MAPS_API_KEY', 'AIzaSyDRymdCLWxCwLHFnwv36iieKAMjiwk8sdc');
    }

    /**
     * Get the formatted address for a given latitude and longitude.
     *
     * @param float $lat
     * @param float $lng
     * @return string|null
     */
    public function getGeoCoding(float $lat, float $lng): ?string
    {
        $response = Http::get("https://maps.googleapis.com/maps/api/geocode/json", [
            'latlng' => "$lat,$lng",
            'key'    => $this->apiKey,
        ]);

        if ($response->successful()) {
            $data = $response->json();
            return $data['results'][0]['formatted_address'] ?? null;
        }

        return null;
    }

    /**
     * Get the distance between two points using the Google Maps Distance Matrix API.
     *
     * @param string $origin      The origin in "latitude,longitude" format.
     * @param string $destination The destination in "latitude,longitude" format.
     * @return array|null         Returns an array with distance and duration or null on failure.
     */
    public function getDistanceForScooter(float $originLat, float $originLng, float $destinationLat, float $destinationLng): ?array
    {
        $origin = "{$originLat},{$originLng}";
        $destination = "{$destinationLat},{$destinationLng}";

        $response = Http::get("https://maps.googleapis.com/maps/api/distancematrix/json", [
            'origins'      => $origin,
            'destinations' => $destination,
            'key'          => $this->apiKey,
            // 'mode'         => 'bicycling',
            'units'        => 'metric',
        ]);

        if ($response->successful()) {
            $data             = $response->json();
            $distanceInMeters = $data['rows'][0]['elements'][0]['distance']['value'] ?? null; // Distance in meters
            $duration         = $data['rows'][0]['elements'][0]['duration']['text'] ?? null;

            return [
                'distance_in_meters' => $distanceInMeters,
                'duration'           => $duration,
            ];
        }

        return null; // Return null if the API request fails
    }
}
