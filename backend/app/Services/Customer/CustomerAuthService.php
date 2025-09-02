<?php

declare(strict_types=1);

namespace App\Services\Customer;

use App\Enums\UserRole;
use App\Models\User;

class CustomerAuthService
{
    public function register(array $data): string
    {
        // Create customer
        $customer = User::create([
            ...$data,
            'password' => bcrypt($data['password']),
        ]);

        // Assign role
        $customer->assignRole(UserRole::CUSTOMER);

        // Generate token
        $token = $customer->createToken('customer_web_token')->plainTextToken;

        return $token;
    }
}
