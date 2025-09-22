<?php

declare(strict_types=1);

namespace App\Http\Requests\Private\Partner\Menu\MenuCategory;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateRestaurantMenuCategoryRequest extends FormRequest
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
        $restaurantId = $this->route('restaurant')->id;

        return [
            'name' => [
                'required',
                'string',
                'max:30',
                Rule::unique('menu_categories')->where(fn ($q) => $q->where('restaurant_id', $restaurantId)),
            ],
            'description' => ['nullable', 'string', 'max:200'],
        ];
    }
}
