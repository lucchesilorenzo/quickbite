<?php

declare(strict_types=1);

namespace App\Http\Requests\Partner\Stats;

use App\Enums\Kpi;
use App\Enums\PaymentMethod;
use App\Enums\StatRange;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class GetRestaurantStatsRequest extends FormRequest
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
            'kpi' => ['required', new Enum(Kpi::class)],
            'range' => ['sometimes', new Enum(StatRange::class)],
            'payment_method' => ['sometimes', new Enum(PaymentMethod::class)],
            'year' => ['sometimes', 'integer'],
        ];
    }
}
