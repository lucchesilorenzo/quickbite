import {
  TForgotPasswordFormSchema,
  TResetPasswordFormSchema,
} from "@/schemas/auth.schema";

export type ForgotPasswordPayload = TForgotPasswordFormSchema;

export type ResetPasswordPayload = TResetPasswordFormSchema & {
  token: string;
};
