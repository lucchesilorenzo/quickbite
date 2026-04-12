import {
  TForgotPasswordFormSchema,
  TResetPasswordFormSchema,
} from "@/schemas/auth.schema";

export type ForgotPasswordRequest = TForgotPasswordFormSchema;

export type ResetPasswordRequest = TResetPasswordFormSchema & {
  token: string;
};

export type RefreshTokenRequest = {
  refresh_token: string;
};

export type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
};
