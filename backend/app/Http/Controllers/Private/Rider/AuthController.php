<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Rider;

use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Rider\Auth\RegisterRequest;
use App\Services\Private\Rider\AuthService;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Rider Auth')]
class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    ) {}

    /**
     * Register a new rider.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $token = $this->authService->register(
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => 'Rider registered successfully.',
                'token' => $token,
            ], 201);
        } catch (LocationNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable $e) {
            if ($e->getCode() === '23505') {
                return response()->json([
                    'success' => false,
                    'message' => 'User already exists.',
                ], 409);
            }

            return response()->json([
                'success' => false,
                'message' => 'Could not register rider.',
            ], 500);
        }
    }
}
