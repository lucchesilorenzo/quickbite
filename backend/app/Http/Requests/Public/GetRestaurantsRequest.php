<?php

declare(strict_types=1);

namespace App\Http\Requests\Public;

use Illuminate\Foundation\Http\FormRequest;

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
            'sort_by' => ['nullable', 'string', 'in:review_rating,distance,minimum_order_value,delivery_time,delivery_fee'],
            'mov' => ['nullable', 'string', 'in:1000,1500'],
            'q' => ['nullable', 'string'],
        ];
    }
}
