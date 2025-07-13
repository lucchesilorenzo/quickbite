<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Restaurant;
use App\Models\RestaurantDeliveryDay;
use Illuminate\Database\Seeder;

class RestaurantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Restaurant::factory(10)
            ->has(RestaurantDeliveryDay::factory()->fullWeek()->count(7), 'deliveryDays')
            ->hasMenuCategories(6)
            ->hasOrders(5)
            ->hasReviews(5)
            ->create();
    }
}
