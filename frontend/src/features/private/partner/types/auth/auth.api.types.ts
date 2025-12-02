import {
  TLoginFormSchema,
  TRegisterFormSchema,
} from "@partner/schemas/auth.schema";

import { ApiResponse } from "@/types/api.types";

export type RegisterPayload = TRegisterFormSchema;

export type RegisterResponse = {
  token: string;
} & ApiResponse;

export type LoginPayload = TLoginFormSchema;

export type LoginResponse = RegisterResponse;
