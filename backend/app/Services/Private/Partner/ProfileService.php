<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Exceptions\Public\LocationNotFoundException;
use App\Models\User;
use App\Services\Shared\LocationService;
use Illuminate\Support\Facades\DB;

class ProfileService
{
    public function __construct(
        private readonly LocationService $locationService
    ) {}

    public function updateProfileGeneralInformation(array $data, User $partner): User
    {
        $locationData = $this->locationService->getLocationData($data);

        if ($locationData === null) {
            throw new LocationNotFoundException;
        }

        $partner->update($data);

        return $partner;
    }

    public function updateProfileNotifications(array $data, User $partner): User
    {
        return DB::transaction(function () use ($data, $partner) {
            foreach ($data as $type => $enabled) {
                $partner->notificationPreferences()->updateOrCreate(
                    ['type' => $type],
                    ['enabled' => $enabled]
                );
            }

            return $partner->load('notificationPreferences');
        });
    }
}
