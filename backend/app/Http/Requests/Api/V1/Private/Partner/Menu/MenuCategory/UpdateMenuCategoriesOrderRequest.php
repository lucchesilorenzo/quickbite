<?php

declare(strict_types=1);

namespace App\Http\Requests\Api\V1\Private\Partner\Menu\MenuCategory;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class UpdateMenuCategoriesOrderRequest extends FormRequest
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
            '*.id' => ['required', 'uuid', 'exists:menu_categories,id'],
            '*.order' => ['required', 'integer'],
        ];
    }

    protected function passedValidation(): void
    {
        // Retrieve the order values from the request array
        $orders = array_column($this->input(), 'order');

        if (count($orders) !== count(array_unique($orders))) {
            throw ValidationException::withMessages([
                'order' => 'Duplicate order values were detected.',
            ]);
        }
    }
}
