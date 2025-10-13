<?php

declare(strict_types=1);

namespace App\Http\Requests\Private\Partner\Restaurant;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFeesRequest extends FormRequest
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
            'delivery_fee' => ['sometimes', 'numeric', 'min:0'],
            'delivery_time_min' => ['required', 'numeric', 'min:1', 'lte:delivery_time_max'],
            'delivery_time_max' => ['required', 'numeric', 'min:1', 'gte:delivery_time_min'],
            'service_fee' => ['sometimes', 'numeric', 'min:0'],
            'min_amount' => ['sometimes', 'numeric', 'min:0'],
        ];
    }
}
