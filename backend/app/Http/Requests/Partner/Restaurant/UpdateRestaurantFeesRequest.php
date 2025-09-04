<?php

declare(strict_types=1);

namespace App\Http\Requests\Partner\Restaurant;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRestaurantFeesRequest extends FormRequest
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
            'delivery_fee' => ['required', 'numeric'],
            'delivery_time_min' => ['required', 'numeric', 'lte:delivery_time_max'],
            'delivery_time_max' => ['required', 'numeric'],
            'service_fee' => ['required', 'numeric'],
            'min_amount' => ['required', 'numeric'],
        ];
    }
}
