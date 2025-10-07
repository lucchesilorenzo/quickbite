<?php

declare(strict_types=1);

namespace App\Http\Requests\Private\Customer\Order;

use App\Enums\PaymentMethod;
use App\Rules\ValidPhoneNumber;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CustomerCreateOrderRequest extends FormRequest
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
            'restaurant_id' => ['required', 'exists:restaurants,id'],
            'first_name' => ['required', 'string', 'min:1', 'max:50'],
            'last_name' => ['required', 'string', 'min:1', 'max:50'],
            'phone_number' => ['required', 'string', 'min:1', new ValidPhoneNumber('IT')],
            'street_address' => ['required', 'string', 'min:1', 'max:50'],
            'building_number' => ['required', 'string', 'min:1', 'max:50'],
            'postcode' => ['required', 'string', 'min:1', 'max:50'],
            'city' => ['required', 'string', 'min:1', 'max:50'],
            'delivery_time' => ['required', 'date', 'after_or_equal:now'],
            'notes' => ['nullable', 'string', 'max:160'],
            'payment_method' => ['required', Rule::enum(PaymentMethod::class)],
            'subtotal' => ['required', 'numeric', 'min:0'],
            'delivery_fee' => ['required', 'numeric', 'min:0'],
            'service_fee' => ['required', 'numeric', 'min:0'],
            'discount_rate' => ['required', 'numeric', 'min:0'],
            'discount' => ['required', 'numeric', 'min:0'],
            'total' => ['required', 'numeric', 'min:0'],

            'order_items' => ['required', 'array', 'min:1'],
            'order_items.*.menu_item_id' => ['required', 'exists:menu_items,id'],
            'order_items.*.name' => ['required', 'exists:menu_items,name'],
            'order_items.*.quantity' => ['required', 'integer', 'min:1'],
            'order_items.*.item_total' => ['required', 'numeric', 'min:0'],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'delivery_time' => $this->input('delivery_time') === 'asap'
                ? now()->toIso8601String()
                : $this->input('delivery_time'),
        ]);
    }
}
