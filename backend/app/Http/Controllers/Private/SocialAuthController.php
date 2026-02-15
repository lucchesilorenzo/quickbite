<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Services\Private\SocialAuthService;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Socialite;

#[Group('Social Auth')]
class SocialAuthController extends Controller
{
    public function __construct(
        private readonly SocialAuthService $socialAuthService
    ) {}

    /**
     * Redirect the user to the provider authentication page.
     */
    public function redirect(string $provider): RedirectResponse
    {
        return Socialite::driver($provider)
            ->stateless()
            ->redirect();
    }

    /**
     * Obtain the user information from provider.
     */
    public function callback(string $provider): RedirectResponse
    {
        $providerUser = Socialite::driver($provider)
            ->stateless()
            ->user();

        $token = $this->socialAuthService->handleSocialLogin($providerUser, $provider);

        return redirect(config('app.frontend_url').'?token='.$token);
    }
}
