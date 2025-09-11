<?php

declare(strict_types=1);

namespace App\Http\Requests\Partner\Menu\MenuItems;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateRestaurantMenuItemRequest extends FormRequest
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
        $menuCategoryId = $this->route('menuCategory')->id;

        return [
            'name' => [
                'required',
                'string',
                'max:30',
                Rule::unique('menu_items')
                    ->where(fn ($q) => $q->where('menu_category_id', $menuCategoryId)),
            ],
            'description' => ['nullable', 'string', 'max:200'],
            'price' => ['required', 'numeric', 'max:100'],
            'image' => [
                'nullable',
                Rule::when(function ($input) {
                    return request()->hasFile('image');
                }, ['image', 'mimes:jpeg,png,jpg,webp', 'max:2048'], ['string']),
            ],
        ];
    }
}
