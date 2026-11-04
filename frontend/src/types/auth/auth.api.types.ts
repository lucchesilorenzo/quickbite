import {
  TForgotPasswordFormSchema,
  TResetPasswordFormSchema,
} from "@/schemas/auth.schema";

export type ForgotPasswordRequest = TForgotPasswordFormSchema;

export type ResetPasswordRequest = TResetPasswordFormSchema & {
  token: string;
};
