<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Support\Collection;

class StaffService
{
    /**
     * @return Collection<int, User>
     */
    public function getStaffMembers(Restaurant $restaurant): Collection
    {
        return $restaurant->riders()->get();
    }
}
