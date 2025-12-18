<?php

declare(strict_types=1);

namespace App\Services\Private\Rider;

use App\Exceptions\Public\LocationNotFoundException;
use App\Models\User;
use App\Services\Shared\LocationService;
use Illuminate\Support\Facades\DB;

class ProfileService
{
    public function __construct(
        private readonly LocationService $locationService
    ) {}

    public function updateProfileGeneralInformation(array $data, User $rider): User
    {
        $locationData = $this->locationService->getLocationData($data);

        if ($locationData === null) {
            throw new LocationNotFoundException;
        }

        $rider->update($data);

        return $rider;
    }

    public function updateProfileNotifications(array $data, User $rider): User
    {
        return DB::transaction(function () use ($data, $rider) {
            foreach ($data as $type => $enabled) {
                $rider->notificationPreferences()->updateOrCreate(
                    ['type' => $type],
                    ['enabled' => $enabled]
                );
            }

            return $rider->load('notificationPreferences');
        });
    }
}
