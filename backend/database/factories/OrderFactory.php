<?php

namespace Database\Factories;

use App\Enums\RolesEnum;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::role(RolesEnum::CUSTOMER)->inRandomOrder()->first()->id,
            'order_code' => fake()->unique()->numberBetween(100000, 999999),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'phone_number' => fake()->phoneNumber(),
            'street_address' => fake()->streetName(),
            'building_number' => fake()->buildingNumber(),
            'postcode' => fake()->postcode(),
            'city' => fake()->city(),
            'country' => 'Italy',
            'delivery_time' => fake()->time('H:i'),
            'notes' => fake()->optional()->text(100),
            'payment_method' => fake()->randomElement(['cash']),
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return self
     */
    public function configure(): self
    {
        return $this->afterCreating(function (Order $order) {
            $this->assignOrderItemsToOrder($order);
        });
    }

    /**
     * Assign order items to order.
     *
     * @param Order $order
     * @return void
     */
    private function assignOrderItemsToOrder(Order $order): void
    {
        $menuItems = MenuItem::inRandomOrder()->limit(rand(2, 4))->get();

        foreach ($menuItems as $menuItem) {
            $quantity = rand(1, 3);

            $order->orderItems()->create([
                'menu_item_id' => $menuItem->id,
                'quantity' => $quantity,
                'item_total' => number_format($menuItem->price * $quantity, 2),
            ]);
        }
    }
}
