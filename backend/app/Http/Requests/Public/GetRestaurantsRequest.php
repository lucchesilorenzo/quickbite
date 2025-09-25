<?php

declare(strict_types=1);

namespace App\Http\Requests\Public;

use App\Enums\RestaurantSortBy;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GetRestaurantsRequest extends FormRequest
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
            'lat' => ['required', 'numeric'],
            'lon' => ['required', 'numeric'],
            'filter' => ['array'],
            'sort_by' => ['sometimes', Rule::enum(RestaurantSortBy::class)],
            'mov' => ['sometimes', 'string', 'in:1000,1500'],
            'q' => ['sometimes', 'string'],
        ];
    }
}
