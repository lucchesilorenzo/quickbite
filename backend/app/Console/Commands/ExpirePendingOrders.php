<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Models\Order;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:expire-pending-orders')]
#[Description('Update the status of pending orders to expired')]
class ExpirePendingOrders extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        Order::query()
            ->where('payment_method', PaymentMethod::ONLINE->value)
            ->where('payment_status', PaymentStatus::PENDING->value)
            ->whereNotNull('payment_intent_id')
            ->where('created_at', '<', now()->subMinutes(30))
            ->update(['payment_status' => PaymentStatus::EXPIRED->value]);
    }
}
