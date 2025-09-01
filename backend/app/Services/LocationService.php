<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;

class LocationService
{
    public function getLocationData(array $data): ?array
    {
        $response = Http::get('https://eu1.locationiq.com/v1/search', [
            'key' => env('LOCATIONIQ_API_KEY'),
            'q' => "{$data['street_address']} {$data['building_number']}, {$data['postcode']} {$data['city']}, {$data['state']}",
            'normalizecity' => 1,
            'countrycodes' => 'IT',
            'format' => 'json',
        ]);

        if (! $response->successful()) {
            return null;
        }

        $json = $response->json();

        if (! is_array($json) || empty($json)) {
            return null;
        }

        return $json[0];
    }
}
