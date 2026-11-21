<?php

declare(strict_types=1);

namespace App\Notifications\Private\Customer;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Number;

class OrderAccepted extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public Order $order,
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject(__('messages.notifications.order_accepted.subject', [
                'name' => $this->order->first_name,
            ]))
            ->greeting(__('messages.notifications.order_accepted.greeting', [
                'name' => "{$this->order->first_name} {$this->order->last_name}",
            ]))
            ->line(__('messages.notifications.order_accepted.body', [
                'code' => $this->order->order_code,
                'restaurant' => $this->order->restaurant->name,
            ]))
            ->line(__('messages.notifications.order_accepted.total', [
                'total' => Number::currency($this->order->total, in: 'EUR'),
            ]))
            ->line(__('messages.notifications.order_accepted.footer'));
    }
}
