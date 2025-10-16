<?php

declare(strict_types=1);

namespace App\Http\Requests\Private\Partner\Stats;

use App\Enums\PaymentMethod;
use App\Enums\StatRange;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GetKpiSummaryRequest extends FormRequest
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
            'range' => ['sometimes', Rule::enum(StatRange::class)],
            'payment_method' => ['sometimes', Rule::enum(PaymentMethod::class)],
            'year' => ['sometimes', 'integer', 'digits:4'],
        ];
    }
}
