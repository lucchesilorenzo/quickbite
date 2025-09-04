<?php

declare(strict_types=1);

namespace App\Http\Requests\Partner\Offer;

use App\Enums\DiscountRate;
use App\Rules\ValidMinDiscountAmount;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateRestaurantOfferRequest extends FormRequest
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
        $restaurant = $this->user()->restaurants()
            ->where('id', $this->route('restaurant')->id)
            ->first();

        return [
            'discount_rate' => ['required', 'numeric', Rule::in(DiscountRate::values())],
            'min_discount_amount' => ['required', 'numeric', new ValidMinDiscountAmount($restaurant->min_amount)],
        ];
    }
}
