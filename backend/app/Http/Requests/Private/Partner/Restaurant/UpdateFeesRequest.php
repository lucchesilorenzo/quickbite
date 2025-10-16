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
            'min_delivery_time' => ['required', 'numeric', 'min:1', 'lte:max_delivery_time'],
            'max_delivery_time' => ['required', 'numeric', 'min:1', 'gte:min_delivery_time'],
            'service_fee' => ['sometimes', 'numeric', 'min:0'],
            'min_amount' => ['sometimes', 'numeric', 'min:0'],
        ];
    }
}
