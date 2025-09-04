<?php

declare(strict_types=1);

namespace App\Http\Requests\Partner\Restaurant;

use App\Rules\ValidPhoneNumber;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRestaurantInfoRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:1', 'max:50'],
            'description' => ['nullable', 'string', 'max:200'],
            'street_address' => ['required', 'string', 'min:1', 'max:50'],
            'building_number' => ['required', 'string', 'min:1', 'max:50'],
            'postcode' => ['required', 'string', 'min:1', 'max:50'],
            'city' => ['required', 'string', 'min:1', 'max:50'],
            'state' => ['required', 'string', 'min:1', 'max:50'],
            'email' => ['required', 'email'],
            'phone_number' => ['required', 'string', 'min:1', 'max:50', new ValidPhoneNumber('IT')],
            'categories' => ['required', 'array', 'min:1', 'max:3'],
            'categories.*' => ['uuid', 'exists:categories,id'],
            'logo' => [
                'nullable',
                Rule::when(function ($input) {
                    return request()->hasFile('logo');
                }, ['image', 'mimes:jpeg,png,jpg,webp', 'max:2048'], ['string']),
            ],
            'cover' => [
                'nullable',
                Rule::when(function ($input) {
                    return request()->hasFile('cover');
                }, ['image', 'mimes:jpeg,png,jpg,webp', 'max:2048'], ['string']),
            ],
        ];
    }
}
