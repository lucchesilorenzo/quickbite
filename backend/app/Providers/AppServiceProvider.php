<?php

declare(strict_types=1);

namespace App\Providers;

use App\Listeners\HandleStripeOrderPayments;
use App\Models\User;
use BackedEnum;
use Dedoc\Scramble\OpenApiContext;
use Dedoc\Scramble\Scramble;
use Dedoc\Scramble\Support\EnumTransformer;
use Dedoc\Scramble\Support\Generator\ClassBasedReference;
use Dedoc\Scramble\Support\Generator\OpenApi;
use Dedoc\Scramble\Support\Generator\Schema;
use Dedoc\Scramble\Support\Generator\SecurityScheme;
use Dedoc\Scramble\Support\Generator\Types\UnknownType;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
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

        Scramble::configure()
            ->withDocumentTransformers(function (OpenApi $openApi, OpenApiContext $context): void {
                $openApi->secure(
                    SecurityScheme::http('bearer')
                );

                $this->registerEnumSchemas($openApi, $context);
            })
            ->withoutEagerLoadAnalysis();

        Event::listen(WebhookReceived::class, HandleStripeOrderPayments::class);

        ResetPassword::createUrlUsing(fn (User $user, string $token): string => config('app.frontend_url') . '/auth/reset-password?token=' . $token . '&email=' . $user->email);
    }

    /**
     * Register every backed enum as an OpenAPI schema, even when no endpoint references it.
     */
    private function registerEnumSchemas(OpenApi $openApi, OpenApiContext $context): void
    {
        foreach (File::allFiles(app_path('Enums')) as $file) {
            $enum = 'App\\Enums\\' . Str::replace(
                ['/', '\\', '.php'],
                ['\\', '\\', ''],
                $file->getRelativePathname(),
            );

            if (
                ! enum_exists($enum)
                || ! is_subclass_of($enum, BackedEnum::class)
                || $enum::cases() === []
                || $context->references->schemas->has($enum)
            ) {
                continue;
            }

            $schema = EnumTransformer::make($enum)->transform();

            if ($schema instanceof UnknownType) {
                continue;
            }

            $reference = $context->references->schemas->add(
                $enum,
                ClassBasedReference::create('schemas', $enum, $openApi->components),
            );

            $openApi->components->addSchema($reference->fullName, Schema::fromType($schema));
        }
    }
}
