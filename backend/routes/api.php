<?php

declare(strict_types=1);

// --- Public routes ---
require __DIR__ . '/api/public/categories.php';
require __DIR__ . '/api/public/restaurants.php';

// --- Private routes ---
require __DIR__ . '/api/private/auth.php';
require __DIR__ . '/api/private/customers.php';
require __DIR__ . '/api/private/carts.php';
require __DIR__ . '/api/private/orders.php';
