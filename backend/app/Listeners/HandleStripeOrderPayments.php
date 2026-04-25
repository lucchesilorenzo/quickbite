<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Models\Order;
use App\Notifications\Private\Partner\NewOrderReceived;
use Laravel\Cashier\Events\WebhookReceived;

/**
 * Reacts to Stripe webhooks for order PaymentIntents.
 *
 * Cashier dispatches {@see WebhookReceived} for every verified webhook
 * before handling subscription/customer events. Payment intents for one-off orders are not
 * persisted by Cashier; we listen here to mark orders paid and notify partners.
 *
 * @see https://laravel.com/docs/billing#handling-stripe-webhooks (Cashier webhooks + events)
 */
class HandleStripeOrderPayments
{
    public function handle(WebhookReceived $event): void
    {
        $type = $event->payload['type'] ?? null;

        match ($type) {
            'payment_intent.succeeded' => $this->handlePaymentIntentSucceeded($event->payload),
            'payment_intent.payment_failed' => $this->handlePaymentIntentFailed($event->payload),
            default => null,
        };
    }

    private function handlePaymentIntentSucceeded(array $payload): void
    {
        $paymentIntent = $payload['data']['object'];
        $orderId = $paymentIntent['metadata']['order_id'] ?? null;

        if (! is_string($orderId) || $orderId === '') {
            return;
        }

        $order = Order::query()->find($orderId);

        if (! $order || $order->payment_intent_id !== $paymentIntent['id']) {
            return;
        }

        $expectedAmount = (int) ($order->total * 100);
        $chargedAmount = (int) ($paymentIntent['amount'] ?? 0);

        if ($chargedAmount !== $expectedAmount) {
            return;
        }

        if ($order->payment_status === PaymentStatus::PAID->value) {
            return;
        }

        $order->update(['payment_status' => PaymentStatus::PAID->value]);

        if ($order->payment_method !== PaymentMethod::ONLINE->value) {
            return;
        }

        $order->load(['orderItems', 'restaurant.reviews.customer']);

        foreach ($order->restaurant->partners as $partner) {
            $partner->notify(new NewOrderReceived($order, $partner));
        }
    }

    private function handlePaymentIntentFailed(array $payload): void
    {
        $paymentIntent = $payload['data']['object'];
        $orderId = $paymentIntent['metadata']['order_id'] ?? null;

        if (! is_string($orderId) || $orderId === '') {
            return;
        }

        $order = Order::query()->find($orderId);

        if (! $order || $order->payment_intent_id !== $paymentIntent['id']) {
            return;
        }

        if ($order->payment_status === PaymentStatus::PAID->value) {
            return;
        }

        $order->update(['payment_status' => PaymentStatus::FAILED->value]);
    }
}
