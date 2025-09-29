<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Enums\NotificationPreference;
use App\Models\RestaurantReview;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class NewReviewReceived extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public RestaurantReview $review
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        $isPreferenceEnabled = $notifiable->notificationPreferences()
            ->where('type', NotificationPreference::NEW_REVIEW->value)
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
            'title' => 'New review received',
            'description' => "Review from {$this->review->customer->first_name} {$this->review->customer->last_name} - {$this->review->rating} stars",
            'meta' => [
                'review_id' => $this->review->id,
                'first_name' => $this->review->customer->first_name,
                'last_name' => $this->review->customer->last_name,
                'created_at' => $this->review->created_at,
            ],
        ];
    }

    /**
     * Get the broadcastable representation of the notification.
     */
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'review_id' => $this->review->id,
            'title' => 'New review received',
            'description' => "Review from {$this->review->customer->first_name} {$this->review->customer->last_name} - {$this->review->rating} stars",
        ]);
    }

    /**
     * Get the type of the notification being broadcast.
     */
    public function broadcastType(): string
    {
        return 'new-review-received';
    }
}
