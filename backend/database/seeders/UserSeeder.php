<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(5)->customer()->create();
        User::factory(5)->restaurateur()->create();
        User::factory(5)->rider()->create();
    }
}
