<?php

declare(strict_types=1);

namespace App\Http\Requests\Partner;

use App\Enums\DeliveryDay;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateRestaurantDeliveryTimesRequest extends FormRequest
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
            'delivery_days' => ['required', 'array'],
            'delivery_days.*.day' => ['required', new Enum(DeliveryDay::class)],
            'delivery_days.*.start_time' => ['nullable', 'date_format:H:i'],
            'delivery_days.*.end_time' => ['nullable', 'date_format:H:i'],
        ];
    }
}
