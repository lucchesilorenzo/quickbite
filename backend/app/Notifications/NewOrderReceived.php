<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Enums\NotificationPreference;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Number;

class NewOrderReceived extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public Order $order
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        $isPreferenceEnabled = $notifiable->notificationPreferences()
            ->where('type', NotificationPreference::NEW_ORDER->value)
            ->where('enabled', true)
            ->exists();

        if (! $isPreferenceEnabled) {
            return [];
        }

        return ['database', 'broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'title' => 'New order received',
            'description' => "Order # {$this->order->order_code} from {$this->order->first_name} {$this->order->last_name} - Total: " . Number::currency(
                $this->order->total,
                in: 'EUR',
                locale: 'it-IT'
            ),
            'meta' => [
                'order_id' => $this->order->id,
                'order_code' => $this->order->order_code,
                'first_name' => $this->order->first_name,
                'last_name' => $this->order->last_name,
                'total' => $this->order->total,
                'created_at' => $this->order->created_at,
            ],
        ];
    }

    /**
     * Get the broadcastable representation of the notification.
     */
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'order_id' => $this->order->id,
            'title' => 'New order received',
            'description' => "Order # {$this->order->order_code} from {$this->order->first_name} {$this->order->last_name} - Total: " . Number::currency(
                $this->order->total,
                in: 'EUR',
                locale: 'it-IT'
            ),
        ]);
    }

    /**
     * Get the type of the notification being broadcast.
     */
    public function broadcastType(): string
    {
        return 'new-order-received';
    }
}
