<?php

declare(strict_types=1);

namespace App\Services\Customer;

use App\Enums\UserRole;
use App\Exceptions\Customer\CustomerAuthException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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

    public function login(array $data): string
    {
        // Get customer
        $customer = User::where('email', $data['email'])->first();

        // Check if customer exists
        if (! $customer) {
            throw new CustomerAuthException('Customer not found.', 404);
        }

        // Check if customer has CUSTOMER role
        if (! $customer->hasRole(UserRole::CUSTOMER)) {
            throw new CustomerAuthException('You are not authorized to log in as a customer.', 403);
        }

        // Check if password is correct
        if (! Hash::check($data['password'], $customer->password)) {
            throw new CustomerAuthException('Invalid credentials.', 401);
        }

        // Generate token
        $token = $customer->createToken('customer_web_token')->plainTextToken;

        return $token;
    }
}
