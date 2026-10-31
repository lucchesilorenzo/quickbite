<?php

declare(strict_types=1);

namespace App\Http\Requests\Api\V1\Public;

use App\Enums\RestaurantSortBy;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GetRestaurantsRequest extends FormRequest
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
            /** Latitude of the search center. */
            'lat' => ['required', 'numeric', 'between:-90,90'],
            /** Longitude of the search center. */
            'lon' => ['required', 'numeric', 'between:-180,180'],
            'filter' => ['array'],
            /**
             * Repeat the parameter to combine filters (`?filter[]=open_now&filter[]=pizza`).
             * Accepts the fixed filters (`open_now`, `new`, `free_delivery`, `with_discounts`),
             * the rating intervals (`one_star` to `five_stars`) or a category slug.
             *
             * @example "open_now"
             */
            'filter.*' => ['string'],
            'sort_by' => ['sometimes', Rule::enum(RestaurantSortBy::class)],
            'mov' => ['sometimes', 'integer', Rule::in([1000, 1500])],
            'q' => ['sometimes', 'string'],
        ];
    }
}
