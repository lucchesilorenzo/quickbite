<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\OrderStatus;
use App\Enums\UserRole;
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
            'user_id' => User::role(UserRole::CUSTOMER)->inRandomOrder()->first()->id,
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
            'subtotal' => fake()->randomFloat(2, 10, 100),
            'delivery_fee' => fake()->randomElement([0, 2.99, 4.99]),
            'service_fee' => fake()->randomElement([0, 0.30, 0.50, 0.75, 1.00]),
            'discount_rate' => fake()->randomElement([0.1, 0.2, 0.3, 0.4, 0.5]),
            'discount' => fake()->randomFloat(2, 0, 10),
            'total' => fake()->randomFloat(2, 10, 100),
            'status' => fake()->randomElement(OrderStatus::values()),
            'created_at' => fake()->dateTimeBetween('-2 years', 'now'),
        ];
    }

    /**
     * Configure the model factory.
     */
    public function configure(): self
    {
        return $this->afterCreating(function (Order $order) {
            $this->assignOrderItemsToOrder($order);
        });
    }

    /**
     * Assign order items to order.
     */
    private function assignOrderItemsToOrder(Order $order): void
    {
        $menuItems = MenuItem::inRandomOrder()->limit(rand(2, 4))->get();

        foreach ($menuItems as $menuItem) {
            $quantity = rand(1, 3);

            $order->orderItems()->create([
                'menu_item_id' => $menuItem->id,
                'name' => $menuItem->name,
                'quantity' => $quantity,
                'item_total' => number_format($menuItem->price * $quantity, 2),
            ]);
        }
    }
}
