<?php

declare(strict_types=1);

namespace App\Notifications\Private\Rider;

use App\Enums\NotificationPreference;
use App\Models\Delivery;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class NewDeliveryReceived extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public Order $order,
        public Delivery $delivery
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Determine if the notification should be sent.
     */
    public function shouldSend(object $notifiable, string $channel): bool
    {
        return $notifiable->notificationPreferences()
            ->where('type', NotificationPreference::NEW_DELIVERY->value)
            ->where('enabled', true)
            ->exists();
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'title' => 'New delivery received',
            'description' => 'Order # ' . $this->order->order_code . ' - Delivery time: ' . Carbon::parse($this->order->delivery_time)
                ->format('d/m/Y \a\t H:i'),
            'meta' => [
                'delivery_id' => $this->delivery->id,
                'order_id' => $this->order->id,
                'order_code' => $this->order->order_code,
                'delivery_time' => $this->order->delivery_time,
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
            'delivery_id' => $this->delivery->id,
            'title' => 'New delivery received',
            'description' => 'Order # ' . $this->order->order_code . ' - Delivery time: ' . Carbon::parse($this->order->delivery_time)
                ->format('d/m/Y \a\t H:i'),
        ]);
    }

    /**
     * Get the type of the notification being broadcast.
     */
    public function broadcastType(): string
    {
        return 'new.delivery.received';
    }
}
