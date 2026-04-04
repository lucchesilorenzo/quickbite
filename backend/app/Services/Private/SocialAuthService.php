<?php

declare(strict_types=1);

namespace App\Services\Private;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Laravel\Socialite\Contracts\User as SocialiteUser;

class SocialAuthService
{
    public function handleSocialLogin(SocialiteUser $providerUser, string $provider): string
    {
        $user = User::query()
            ->where('email', $providerUser->getEmail())
            ->first();

        if (! $user) {
            $user = User::query()->create([
                'first_name' => explode(' ', (string) $providerUser->getName())[0],
                'last_name' => explode(' ', (string) $providerUser->getName())[1],
                'email' => $providerUser->getEmail(),
                'profile_picture' => $providerUser->getAvatar(),
            ]);
        }

        $user->socialProviders()->firstOrCreate([
            'provider' => $provider,
            'provider_id' => $providerUser->getId(),
        ]);

        $user->assignRole(UserRole::CUSTOMER);

        if (! $user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            event(new Verified($user));
        }

        return $user->createToken('customer_web_token')->plainTextToken;
    }
}
