<?php

declare(strict_types=1);

namespace App\Http\Requests\Api\V1\Private\Rider\JobPost;

use App\Enums\EmploymentType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GetJobPostsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $minSalary = config('job_posts.salary.min');
        $maxSalary = config('job_posts.salary.max');

        return [
            'search' => ['sometimes', 'string'],
            'min_salary' => [
                'sometimes',
                'integer',
                "min:{$minSalary}",
                "max:{$maxSalary}",
                'lte:max_salary',
            ],
            'max_salary' => [
                'sometimes',
                'integer',
                "min:{$minSalary}",
                "max:{$maxSalary}",
                'gte:min_salary',
            ],
            'employment_type' => ['sometimes', Rule::enum(EmploymentType::class)],
            'sort_by' => ['sometimes', 'in:asc,desc'],
        ];
    }
}
