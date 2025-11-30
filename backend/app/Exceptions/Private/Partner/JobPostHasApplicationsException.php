<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Partner;

use Exception;

class JobPostHasApplicationsException extends Exception
{
    public function __construct(
        string $message = 'Cannot delete job post with applications.',
        int $code = 400
    ) {
        parent::__construct($message, $code);
    }
}
