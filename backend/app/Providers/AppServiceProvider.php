<?php

declare(strict_types=1);

namespace App\Providers;

use App\Listeners\HandleStripeOrderPayments;
use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Laravel\Cashier\Events\WebhookReceived;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();

        Event::listen(WebhookReceived::class, HandleStripeOrderPayments::class);

        ResetPassword::createUrlUsing(fn (User $user, string $token): string => config('app.frontend_url') . '/auth/reset-password?token=' . $token . '&email=' . $user->email);
    }
}
