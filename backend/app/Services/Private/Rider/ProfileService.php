<?php

declare(strict_types=1);

namespace App\Services\Private\Rider;

use App\Exceptions\Public\LocationNotFoundException;
use App\Models\User;
use App\Services\Shared\LocationService;

class ProfileService
{
    public function __construct(
        private readonly LocationService $locationService
    ) {}

    public function updateProfileGeneralInformation(array $data, User $rider): User
    {
        $locationData = $this->locationService->getLocationData($data);

        if ($locationData === null) {
            throw new LocationNotFoundException;
        }

        $rider->update($data);

        return $rider;
    }
}
