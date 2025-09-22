<?php

declare(strict_types=1);

namespace App\Services\Private\Customer;

use App\Models\User;

class CustomerProfileService
{
    public function updateProfile(User $customer, array $data): User
    {
        $customer->update($data);

        return $customer;
    }
}
