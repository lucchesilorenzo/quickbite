<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::firstOrCreate(['name' => UserRole::CUSTOMER]);
        Role::firstOrCreate(['name' => UserRole::PARTNER]);
        Role::firstOrCreate(['name' => UserRole::RIDER]);
    }
}
