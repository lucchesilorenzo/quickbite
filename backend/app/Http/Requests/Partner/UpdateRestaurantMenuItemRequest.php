<?php

declare(strict_types=1);

namespace App\Http\Requests\Partner;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRestaurantMenuItemRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:1', 'max:30'],
            'description' => ['nullable', 'string', 'max:200'],
            'price' => ['required', 'numeric', 'min:1', 'max:100'],
            'image' => [
                'nullable',
                Rule::when(function ($input) {
                    return request()->hasFile('image');
                }, ['image', 'mimes:jpeg,png,jpg,webp', 'max:2048'], ['string']),
            ],
            'is_available' => ['required', 'boolean'],
        ];
    }
}
