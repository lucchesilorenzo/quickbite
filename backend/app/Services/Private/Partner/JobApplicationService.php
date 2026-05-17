<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Enums\JobApplicationStatus;
use App\Enums\JobPostStatus;
use App\Enums\RestaurantRole;
use App\Exceptions\Private\Partner\AlreadyEmployedException;
use App\Models\JobApplication;
use App\Models\JobPost;
use App\Services\Shared\TableQueryService;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class JobApplicationService
{
    public function __construct(
        private readonly TableQueryService $tableQueryService
    ) {}

    public function getJobApplications(array $data, JobPost $jobPost): LengthAwarePaginator
    {
        $query = $jobPost->jobApplications();

        $query = $this->tableQueryService->apply(
            $data,
            $query,
            searchable: ['first_name', 'last_name', 'email', 'phone_number']
        );

        return $query->paginate($data['page_size']);
    }

    public function updateJobApplicationStatus(array $data, JobApplication $jobApplication): JobApplication
    {
        $alreadyEmployed = DB::table('restaurant_user')
            ->where('user_id', $jobApplication->rider_id)
            ->where('role', RestaurantRole::RIDER->value)
            ->where('is_active', true)
            ->exists();

        if ($alreadyEmployed) {
            throw new AlreadyEmployedException;
        }

        DB::transaction(function () use ($data, $jobApplication): void {
            JobApplication::query()
                ->where('job_post_id', $jobApplication->job_post_id)
                ->whereNot('id', $jobApplication->id)
                ->update([
                    'status' => JobApplicationStatus::REJECTED->value,
                ]);

            $jobApplication->jobPost->update([
                'status' => JobPostStatus::CLOSED->value,
            ]);

            $jobApplication->update($data);

            $jobApplication->rider->restaurants()
                ->attach($jobApplication->jobPost->restaurant->id, [
                    'role' => RestaurantRole::RIDER->value,
                    'is_active' => true,
                ]);
        });

        return $jobApplication->refresh();
    }
}
