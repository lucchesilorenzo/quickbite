import {
  TLoginFormSchema,
  TRegisterFormSchema,
} from "@rider/schemas/auth.schema";

import { ApiResponse } from "@/types/api.types";

export type RegisterRequest = TRegisterFormSchema;

export type RegisterResponse = {
  access_token: string;
} & ApiResponse;

export type LoginRequest = TLoginFormSchema;

export type LoginResponse = RegisterResponse;
