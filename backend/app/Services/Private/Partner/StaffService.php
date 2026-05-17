<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Models\Restaurant;
use App\Models\User;
use App\Services\Shared\TableQueryService;
use Illuminate\Pagination\LengthAwarePaginator;

class StaffService
{
    public function __construct(
        private readonly TableQueryService $tableQueryService
    ) {}

    public function getStaffMembers(array $data, Restaurant $restaurant): LengthAwarePaginator
    {
        $query = $restaurant->riders();

        $query = $this->tableQueryService->apply(
            $data,
            $query,
            searchable: ['first_name', 'last_name']
        );

        return $query->paginate($data['page_size']);
    }

    public function deleteStaffMember(
        Restaurant $restaurant,
        User $staffMember
    ): void {
        $restaurant->riders()->detach($staffMember);
    }
}
