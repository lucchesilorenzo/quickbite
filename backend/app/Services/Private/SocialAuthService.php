<?php

declare(strict_types=1);

namespace App\Services\Private;

use App\Enums\UserRole;
use App\Models\User;
use App\Services\Private\Shared\TokenService;
use Illuminate\Auth\Events\Verified;
use Laravel\Socialite\Contracts\User as SocialiteUser;

class SocialAuthService
{
    public function __construct(
        private readonly TokenService $tokenService
    ) {}

    public function handleSocialLogin(SocialiteUser $providerUser, string $provider): array
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

        return $this->tokenService->generateTokens($user);
    }
}
