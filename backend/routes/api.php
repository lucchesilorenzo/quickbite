<?php

declare(strict_types=1);

// === Public routes ===
require __DIR__ . '/api/public.php';

// === Private routes ===
require __DIR__ . '/api/private/auth.php';
require __DIR__ . '/api/private/customers.php';
require __DIR__ . '/api/private/partners.php';
require __DIR__ . '/api/private/riders.php';
