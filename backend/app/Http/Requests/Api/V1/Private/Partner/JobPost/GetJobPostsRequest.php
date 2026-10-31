<?php

declare(strict_types=1);

namespace App\Http\Requests\Api\V1\Private\Partner\JobPost;

use Illuminate\Contracts\Validation\ValidationRule;
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'page_size' => ['required', 'integer', Rule::in([25, 50, 100])],
            /**
             * JSON object with the field to sort by and the direction (`asc` or `desc`).
             *
             * @example "{\"field\":\"title\",\"sort\":\"asc\"}"
             */
            'sort_by' => ['sometimes', 'string', 'json'],
            /**
             * JSON object with the field, operator and value used to filter the list.
             *
             * @example "{\"field\":\"title\",\"operator\":\"contains\",\"value\":\"manager\"}"
             */
            'filter' => ['sometimes', 'string', 'json'],
            'search' => ['sometimes', 'string'],
        ];
    }
}
