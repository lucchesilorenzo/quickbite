<?php

declare(strict_types=1);

namespace App\Notifications\Private\Customer;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Number;

class OrderDelivered extends Notification implements ShouldQueue
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
            ->subject("{$this->order->first_name}, your order has been delivered!")
            ->greeting("Hi {$this->order->first_name} {$this->order->last_name},")
            ->line("We're happy to let you know that your order # {$this->order->order_code} from {$this->order->restaurant->name} has just been delivered.")
            ->line('Total paid: '.Number::currency($this->order->total, in: 'EUR', locale: 'it-IT'))
            ->line('Thank you for ordering with us! We hope you enjoyed your meal.');
    }
}
