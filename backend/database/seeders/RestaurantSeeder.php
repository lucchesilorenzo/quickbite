<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\DeliveryDay;
use App\Models\Restaurant;
use Illuminate\Database\Seeder;

class RestaurantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Restaurant::factory(10)
            ->has(DeliveryDay::factory()->fullWeek()->count(7), 'deliveryDays')
            ->hasMenuCategories(6)
            ->hasOrders(100)
            ->hasReviews(50)
            ->create();
    }
}
