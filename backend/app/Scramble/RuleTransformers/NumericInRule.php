<?php

declare(strict_types=1);

namespace App\Scramble\RuleTransformers;

use Dedoc\Scramble\Contracts\RuleTransformer;
use Dedoc\Scramble\Support\Generator\Types\NumberType;
use Dedoc\Scramble\Support\Generator\Types\Type;
use Dedoc\Scramble\Support\RuleTransforming\NormalizedRule;
use Dedoc\Scramble\Support\RuleTransforming\RuleTransformerContext;

/**
 * Keeps numeric `in` rule values numeric in the generated schema.
 *
 * Scramble always serializes `in` parameters as strings, which produces schemas such as
 * `type: number, enum: ["0.05", "0.10"]`. This transformer restores the numeric values
 * whenever the rule is applied to a numeric field.
 */
class NumericInRule implements RuleTransformer
{
    public function shouldHandle(NormalizedRule $rule): bool
    {
        return $rule->is('in');
    }

    public function toSchema(Type $previous, NormalizedRule $rule, RuleTransformerContext $context): Type
    {
        if (! $previous instanceof NumberType) {
            return $previous;
        }

        $enum = collect($rule->parameters)
            ->map(fn (mixed $value): string => mb_trim((string) $value, '"'))
            ->map(fn (string $value): float|string => is_numeric($value) ? (float) $value : $value)
            ->values()
            ->all();

        $previous->enum($enum);

        return $previous;
    }
}
