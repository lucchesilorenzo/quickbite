<?php

declare(strict_types=1);

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Notifications\DatabaseNotification;

/**
 * @mixin DatabaseNotification
 */
class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array{
     *     id: string,
     *     type: string,
     *     notifiable_type: string,
     *     notifiable_id: string,
     *     data: array{
     *         title: string,
     *         description: string,
     *         meta: array<string, string|int|float|null>
     *     },
     *     read_at: string|null,
     *     created_at: string|null,
     *     updated_at: string|null
     * }
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'notifiable_type' => $this->notifiable_type,
            'notifiable_id' => $this->notifiable_id,
            'data' => [
                'title' => (string) ($this->data['title'] ?? ''),
                'description' => (string) ($this->data['description'] ?? ''),
                'meta' => $this->meta(),
            ],
            'read_at' => $this->read_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    /**
     * @return array<string, string|int|float|null>
     */
    private function meta(): array
    {
        /** @var array<string, string|int|float|null> $meta */
        $meta = $this->data['meta'] ?? [];

        return $meta;
    }
}
