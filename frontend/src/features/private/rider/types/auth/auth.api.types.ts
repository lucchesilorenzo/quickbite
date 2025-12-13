import { TRegisterFormSchema } from "@rider/schemas/auth.schema";

import { ApiResponse } from "@/types/api.types";

export type RegisterPayload = TRegisterFormSchema;

export type RegisterResponse = {
  token: string;
} & ApiResponse;
