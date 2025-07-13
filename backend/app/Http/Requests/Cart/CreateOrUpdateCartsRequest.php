<?php

declare(strict_types=1);

namespace App\Http\Requests\Cart;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrUpdateCartsRequest extends FormRequest
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
            '*.restaurant.id' => ['required', 'uuid', 'exists:restaurants,id'],

            '*.items' => ['required', 'array', 'min:1'],

            '*.items.*.id' => ['required', 'uuid', 'exists:menu_items,id'],
            '*.items.*.menu_category_id' => ['required', 'uuid', 'exists:menu_categories,id'],
            '*.items.*.name' => ['required', 'string'],
            '*.items.*.description' => ['nullable', 'string'],
            '*.items.*.price' => ['required', 'numeric', 'min:0'],
            '*.items.*.image' => ['nullable', 'string'],
            '*.items.*.is_available' => ['required', 'boolean'],
            '*.items.*.created_at' => ['required', 'date'],
            '*.items.*.updated_at' => ['required', 'date'],
            '*.items.*.quantity' => ['required', 'integer', 'min:1'],
            '*.items.*.item_total' => ['required', 'numeric', 'min:0'],

            '*.total_items' => ['required', 'integer', 'min:1'],
            '*.total_unique_items' => ['required', 'integer', 'min:1'],
            '*.cart_total' => ['required', 'numeric', 'min:0'],
        ];
    }
}
