<?php

declare(strict_types=1);

namespace App\Http\Requests\Api\V1\Private\Customer\Cart;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateOrUpdateCartRequest extends FormRequest
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
            'restaurant.id' => ['required', 'uuid', Rule::exists('restaurants', 'id')],

            'total_items' => ['required', 'integer', 'min:0'],
            'total_unique_items' => ['required', 'integer', 'min:0'],
            'cart_total' => ['required', 'numeric', 'min:0'],

            'items' => ['nullable', 'array'],
            'items.*.id' => ['required', 'uuid', Rule::exists('menu_items', 'id')],
            'items.*.menu_category_id' => ['required', 'uuid', Rule::exists('menu_categories', 'id')],
            'items.*.name' => ['required', 'string'],
            'items.*.description' => ['nullable', 'string'],
            'items.*.price' => ['required', 'numeric', 'min:0'],
            'items.*.image' => ['nullable', 'string'],
            'items.*.is_available' => ['required', 'boolean'],
            'items.*.created_at' => ['required', Rule::date()],
            'items.*.updated_at' => ['required', Rule::date()],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'items.*.item_total' => ['required', 'numeric', 'min:0'],
        ];
    }
}
