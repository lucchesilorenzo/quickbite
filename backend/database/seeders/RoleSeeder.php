<?php

namespace Database\Seeders;

use App\Enums\RolesEnum;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::firstOrCreate(['name' => RolesEnum::CUSTOMER]);
        Role::firstOrCreate(['name' => RolesEnum::RESTAURATEUR]);
        Role::firstOrCreate(['name' => RolesEnum::RIDER]);
    }
}
