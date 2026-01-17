<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Exceptions\Private\Partner\RestaurantApprovalException;
use App\Exceptions\Public\LocationNotFoundException;
use App\Models\Restaurant;
use App\Models\User;
use App\Services\Shared\FileService;
use App\Services\Shared\LocationService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Throwable;

class RestaurantService
{
    public function __construct(
        private readonly LocationService $locationService,
        private readonly FileService $fileService
    ) {}

    public function getRestaurants(User $partner): Collection
    {
        return $partner->restaurants()->get();
    }

    public function getRestaurant(Restaurant $restaurant): Restaurant
    {
        return $this->loadRestaurantRelations($restaurant);
    }

    public function updateStatus(array $data, Restaurant $restaurant): Restaurant
    {
        $restaurant->update([
            'force_close' => $data['force_close'],
        ]);

        return $this->loadRestaurantRelations($restaurant);
    }

    public function updateApprovedStatus(Restaurant $restaurant): Restaurant
    {
        $isValid = $restaurant->min_delivery_time !== null &&
            $restaurant->max_delivery_time !== null &&
            $restaurant->phone_number !== null &&
            $restaurant->email !== null &&
            $restaurant->logo !== null &&
            $restaurant->cover !== null &&
            $restaurant->categories()->exists() &&
            $restaurant->deliveryDays()->exists() &&
            $restaurant->menuCategories()->whereHas('menuItems')->exists();

        if (! $isValid) {
            throw new RestaurantApprovalException;
        }

        $restaurant->update([
            'is_approved' => true,
        ]);

        return $this->loadRestaurantRelations($restaurant);
    }

    public function updateFees(array $data, Restaurant $restaurant): Restaurant
    {
        $restaurant->update($data);

        return $this->loadRestaurantRelations($restaurant);
    }

    public function updateDeliveryTimes(array $data, Restaurant $restaurant): Restaurant
    {
        return DB::transaction(function () use ($restaurant, $data): Restaurant {
            foreach ($data['delivery_days'] as $deliveryDay) {
                $restaurant->deliveryDays()
                    ->where('day', $deliveryDay['day'])
                    ->update([
                        'start_time' => $deliveryDay['start_time'],
                        'end_time' => $deliveryDay['end_time'],
                    ]);
            }

            return $this->loadRestaurantRelations($restaurant);
        });
    }

    public function updateInfo(
        array $data,
        Restaurant $restaurant,
    ): Restaurant {
        $newLogoPath = null;
        $newCoverPath = null;
        $oldLogoPath = $restaurant->logo;
        $oldCoverPath = $restaurant->cover;

        try {
            if ($data['logo'] instanceof UploadedFile) {
                $newLogoPath = $data['logo']->store('restaurants/logos', 'public');
                $data['logo'] = $newLogoPath;
            }

            if ($data['cover'] instanceof UploadedFile) {
                $newCoverPath = $data['cover']->store('restaurants/covers', 'public');
                $data['cover'] = $newCoverPath;
            }

            $restaurant = DB::transaction(function () use ($restaurant, $data): Restaurant {
                $locationData = $this->locationService->getLocationData($data);

                if ($locationData === null) {
                    throw new LocationNotFoundException;
                }

                $restaurant->update([
                    ...$data,
                    'latitude' => $locationData['lat'],
                    'longitude' => $locationData['lon'],
                ]);

                $restaurant->categories()->sync($data['categories']);

                return $this->loadRestaurantRelations($restaurant);
            });

            if ($newLogoPath && $oldLogoPath) {
                $this->fileService->delete($oldLogoPath, 'public', 'logos/default');
            }

            if ($newCoverPath && $oldCoverPath) {
                $this->fileService->delete($oldCoverPath, 'public', 'covers/default');
            }

            return $restaurant;
        } catch (Throwable $e) {
            if ($newLogoPath) {
                $this->fileService->delete($newLogoPath, 'public');
            }

            if ($newCoverPath) {
                $this->fileService->delete($newCoverPath, 'public');
            }

            throw $e;
        }
    }

    private function loadRestaurantRelations(Restaurant $restaurant): Restaurant
    {
        return $restaurant->load([
            'categories',
            'deliveryDays' => fn ($query) => $query->orderBy('order'),
        ]);
    }
}
