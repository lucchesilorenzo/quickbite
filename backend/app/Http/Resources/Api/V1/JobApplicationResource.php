<?php

declare(strict_types=1);

namespace App\Http\Resources\Api\V1;

use App\Models\JobApplication;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin JobApplication
 */
class JobApplicationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'job_post_id' => $this->job_post_id,
            'rider_id' => $this->rider_id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'resume' => $this->resume,
            'status' => $this->status,
            'declaration_accepted_at' => $this->declaration_accepted_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'job_post' => JobPostResource::make($this->whenLoaded('jobPost')),
            'rider' => UserResource::make($this->whenLoaded('rider')),
        ];
    }
}
