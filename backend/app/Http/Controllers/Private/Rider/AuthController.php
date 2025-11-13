<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Rider;

use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Rider\Auth\RegisterRequest;
use App\Services\Private\Rider\AuthService;
use Illuminate\Http\JsonResponse;
use Throwable;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    ) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $token = $this->authService->register(
                $request->validated()
            );

            return response()->json([
                'token' => $token,
                'message' => 'Rider registered successfully.',
            ], 201);
        } catch (LocationNotFoundException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable $e) {
            if ($e->getCode() === '23505') {
                return response()->json([
                    'message' => 'User already exists.',
                ], 409);
            }

            return response()->json([
                'message' => 'Could not register rider.',
            ], 500);
        }
    }
}
