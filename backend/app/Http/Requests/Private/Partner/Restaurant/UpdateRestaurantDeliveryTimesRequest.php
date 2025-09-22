<?php

declare(strict_types=1);

namespace App\Http\Requests\Private\Partner\Restaurant;

use App\Enums\DeliveryDay;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'delivery_days.*.day' => ['required', Rule::enum(DeliveryDay::class)],
            'delivery_days.*.start_time' => ['nullable', 'date_format:H:i'],
            'delivery_days.*.end_time' => ['nullable', 'date_format:H:i'],
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function ($validator) {
            $deliveryDays = $this->input('delivery_days');

            foreach ($deliveryDays as $day) {
                if ($day['start_time'] && $day['end_time'] && $day['start_time'] > $day['end_time']) {
                    $validator->errors()->add('delivery_days', 'End time must be after start time.');
                    break;
                }
            }
        });
    }
}
