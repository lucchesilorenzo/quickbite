<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Exceptions\Private\Partner\RestaurantApprovalException;
use App\Exceptions\Public\LocationNotFoundException;
use App\Models\Restaurant;
use App\Models\User;
use App\Services\Shared\ImageService;
use App\Services\Shared\LocationService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class RestaurantService
{
    public function __construct(
        private readonly LocationService $locationService,
        private readonly ImageService $imageService
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
        $isValid = $restaurant->delivery_time_min !== null &&
            $restaurant->delivery_time_max !== null &&
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
        ?UploadedFile $logo,
        ?UploadedFile $cover
    ): Restaurant {
        if ($logo instanceof UploadedFile) {
            $data['logo'] = $this->imageService->update(
                $restaurant->logo,
                $logo,
                'restaurants/logos',
                'logos/default'
            );
        }

        if ($cover instanceof UploadedFile) {
            $data['cover'] = $this->imageService->update(
                $restaurant->cover,
                $cover,
                'restaurants/covers',
                'covers/default'
            );
        }

        return DB::transaction(function () use ($restaurant, $data): Restaurant {
            // Get location
            $locationData = $this->locationService->getLocationData($data);

            if ($locationData === null) {
                throw new LocationNotFoundException;
            }

            // Update restaurant info
            $restaurant->update([
                ...$data,
                'latitude' => $locationData['lat'],
                'longitude' => $locationData['lon'],
            ]);

            // Create or update restaurant categories
            $restaurant->categories()->sync($data['categories']);

            return $this->loadRestaurantRelations($restaurant);
        });
    }

    private function loadRestaurantRelations(Restaurant $restaurant): Restaurant
    {
        return $restaurant->load([
            'categories',
            'deliveryDays' => fn ($query) => $query->orderBy('order'),
        ]);
    }
}
