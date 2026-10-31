<?php

declare(strict_types=1);

namespace App\Scramble\InferExtensions;

use Dedoc\Scramble\Infer\Extensions\AnyMethodReturnTypeExtension;
use Dedoc\Scramble\Infer\Extensions\Event\AnyMethodCallEvent;
use Dedoc\Scramble\Support\Type\ObjectType;
use Dedoc\Scramble\Support\Type\StringType;
use Dedoc\Scramble\Support\Type\Type;
use Dedoc\Scramble\Support\Type\UnknownType;
use Throwable;

/**
 * Resolves `getMessage()` calls on throwable instances.
 *
 * Scramble cannot read the source of PHP's internal classes, so `$e->getMessage()`
 * is otherwise inferred as an unknown type. Catch variables are not typed either,
 * which is why unknown instances are handled as well.
 */
class ThrowableMethodReturnTypeExtension implements AnyMethodReturnTypeExtension
{
    public function getMethodReturnType(AnyMethodCallEvent $event): ?Type
    {
        if ($event->getName() !== 'getMessage') {
            return null;
        }

        $instance = $event->getInstance();

        if ($instance instanceof ObjectType && $instance->isInstanceOf(Throwable::class)) {
            return new StringType;
        }

        if ($instance instanceof UnknownType) {
            return new StringType;
        }

        return null;
    }
}
