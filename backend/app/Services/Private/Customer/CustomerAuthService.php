<?php

declare(strict_types=1);

namespace App\Services\Private\Customer;

use App\Enums\UserRole;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;

class CustomerAuthService
{
    public function register(array $data): string
    {
        $customer = User::create([
            ...$data,
            'password' => bcrypt($data['password']),
        ]);

        $customer->assignRole(UserRole::CUSTOMER);

        return $customer->createToken('customer_web_token')->plainTextToken;
    }

    public function login(array $data): string
    {
        $customer = User::where('email', $data['email'])->first();

        if (! $customer || ! Hash::check($data['password'], $customer->password)) {
            throw new Exception('Invalid credentials.', 401);
        }

        if (! $customer->hasRole(UserRole::CUSTOMER)) {
            throw new Exception('You are not authorized to log in as a customer.', 403);
        }

        return $customer->createToken('customer_web_token')->plainTextToken;
    }

    public function logout(User $customer): void
    {
        $customer->currentAccessToken()->delete();
    }
}
