<?php

declare(strict_types=1);

namespace App\Http\Requests\Private\Partner\JobPost;

use App\Enums\EmploymentType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateJobPostRequest extends FormRequest
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
        return [
            'title' => ['required', 'string', 'min:1', 'max:50'],
            'description_html' => ['required', 'string', 'min:1'],
            'description_text' => ['required', 'string', 'min:1', 'max:2000'],
            'employment_type' => ['required', Rule::enum(EmploymentType::class)],
            'status' => ['required', Rule::in(['open', 'closed'])],
            'salary' => ['nullable', 'numeric', 'min:10000', 'max:1000000'],
        ];
    }
}
