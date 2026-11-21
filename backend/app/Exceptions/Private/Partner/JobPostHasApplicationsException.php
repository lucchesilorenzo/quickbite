<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Partner;

use Exception;

class JobPostHasApplicationsException extends Exception
{
    public function __construct(
        ?string $message = null,
        int $code = 400
    ) {
        parent::__construct($message ?? __('messages.exceptions.job_post_has_applications'), $code);
    }
}
