<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Private\SocialAuthService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\IgnoreResponse;
use Dedoc\Scramble\Attributes\Response;
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
     *
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'socialAuthRedirect',
        title: 'Social auth redirect',
        description: 'Redirect the user to the provider authentication page.',
        method: 'GET'
    )]
    #[IgnoreResponse(200)]
    #[Response(
        status: 302,
        description: 'Redirect to provider authentication page.',
    )]
    public function redirect(string $provider): RedirectResponse
    {
        return Socialite::driver($provider)
            ->stateless()
            ->redirect();
    }

    /**
     * Obtain the user information from provider.
     *
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'socialAuthCallback',
        title: 'Social auth callback',
        description: 'Obtain the user information from provider and redirect to frontend with tokens.',
        method: 'GET'
    )]
    #[IgnoreResponse(200)]
    #[Response(
        status: 302,
        description: 'Redirect to frontend with access and refresh tokens.',
    )]
    public function callback(string $provider): RedirectResponse
    {
        $providerUser = Socialite::driver($provider)
            ->stateless()
            ->user();

        $tokens = $this->socialAuthService->handleSocialLogin($providerUser, $provider);

        return redirect(config('app.frontend_url') . '?access_token=' . $tokens['access_token'] . '&refresh_token=' . $tokens['refresh_token']);
    }
}
