<?php

declare(strict_types=1);

namespace App\Services\Private\Customer;

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
}
