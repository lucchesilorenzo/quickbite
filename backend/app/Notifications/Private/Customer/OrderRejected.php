<?php

declare(strict_types=1);

namespace App\Notifications\Private\Customer;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OrderRejected extends Notification implements ShouldQueue
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
            ->subject('Your order has been rejected')
            ->greeting("Hello {$this->order->first_name} {$this->order->last_name},")
            ->line("We regret to inform you that your order # {$this->order->order_code} from {$this->order->restaurant->name} has been rejected.")
            ->line('If you have any questions or wish to place another order, please contact us or try again.')
            ->line('We apologize for any inconvenience caused and thank you for your understanding.');
    }
}
