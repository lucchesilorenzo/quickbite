<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offer>
 */
class OfferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $discountRates = [
            '0.05' => 30,
            '0.1' => 50,
            '0.15' => 70,
        ];

        static $i = 0;

        return [
            'discount_rate' => array_keys($discountRates)[($i % count($discountRates))],
            'min_discount_amount' => array_values($discountRates)[($i++ % count($discountRates))],
        ];
    }
}
