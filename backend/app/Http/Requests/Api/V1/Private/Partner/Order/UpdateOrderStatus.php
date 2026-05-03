<?php

declare(strict_types=1);

namespace App\Http\Requests\Api\V1\Private\Partner\Order;

use App\Enums\OrderStatus;
use App\Enums\UserRole;
use App\Rules\IsOrderStatusValid;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateOrderStatus extends FormRequest
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
        $order = $this->route('order');

        return [
            'status' => [
                'required',
                Rule::enum(OrderStatus::class),
                new IsOrderStatusValid($order, UserRole::PARTNER),
            ],
        ];
    }
}
