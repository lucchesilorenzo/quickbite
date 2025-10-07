<?php

declare(strict_types=1);

namespace App\Services\Private\Customer;

use App\Exceptions\Public\LocationNotFoundException;
use App\Models\User;
use App\Services\Shared\LocationService;

class CustomerProfileService
{
    public function __construct(
        private readonly LocationService $locationService
    ) {}

    public function updatePersonalInfo(User $customer, array $data): User
    {
        $customer->update($data);

        return $customer;
    }

    public function updateAddressInfo(User $customer, array $data): User
    {
        $locationData = $this->locationService->getLocationData($data);

        if ($locationData === null) {
            throw new LocationNotFoundException;
        }

        $customer->update($data);

        return $customer;
    }
}
