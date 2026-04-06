import {
  TForgotPasswordFormSchema,
  TResetPasswordFormSchema,
} from "@/schemas/auth.schema";

export type ForgotPasswordPayload = TForgotPasswordFormSchema;

export type ResetPasswordPayload = TResetPasswordFormSchema & {
  token: string;
};

export type RefreshTokenPayload = {
  refresh_token: string;
};

export type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
};
