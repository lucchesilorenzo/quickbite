<?php

declare(strict_types=1);

namespace App\Http\Requests\Private\Partner\JobPost;

use Illuminate\Foundation\Http\FormRequest;

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
        return [
            'page_size' => ['required', 'in:25,50,100'],
            'sort_by' => ['sometimes', 'string'],
            'filter' => ['sometimes', 'string'],
            'search' => ['sometimes', 'string'],
        ];
    }
}
