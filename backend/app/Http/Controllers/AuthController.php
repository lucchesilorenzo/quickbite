<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Throwable;

class AuthController extends Controller
{
    /**
     * Get the authenticated user.
     *
     * @return void
     */
    public function me(): JsonResponse
    {
        try {
            $user = auth()->user();
            $user->getRoleNames();

            return response()->json($user, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get user.',
            ], 500);
        }
    }
}
