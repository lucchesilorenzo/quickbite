<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Exceptions\Public\LocationNotFoundException;
use App\Models\User;
use App\Services\Shared\LocationService;
use Illuminate\Support\Facades\DB;

class PartnerProfileService
{
    public function __construct(
        private readonly LocationService $locationService
    ) {}

    public function updateProfileGeneralInformation(array $data, User $user): User
    {
        $locationData = $this->locationService->getLocationData($data);

        if ($locationData === null) {
            throw new LocationNotFoundException;
        }

        $user->update($data);

        return $user;
    }

    public function updateProfileNotifications(array $data, User $user): User
    {
        return DB::transaction(function () use ($data, $user) {
            foreach ($data as $type => $enabled) {
                $user->notificationPreferences()->updateOrCreate(
                    ['type' => $type],
                    ['enabled' => $enabled]
                );
            }

            return $user->load('notificationPreferences');
        });
    }
}
