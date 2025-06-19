import { matchIsValidTel } from "mui-tel-input";
import { z } from "zod/v4";

export const editPersonalInfoForm = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, "Please fill out your first name.")
    .max(50, "First name is too long."),
  last_name: z
    .string()
    .trim()
    .min(1, "Please fill out your last name.")
    .max(50, "Last name is too long."),
  email: z
    .email({ error: "Please enter a valid email address." })
    .min(1, "Email is required."),
  phone_number: z
    .string()
    .trim()
    .min(1, "Please fill out your phone number.")
    .refine(
      (phone_number) =>
        matchIsValidTel(phone_number, { onlyCountries: ["IT"] }),
      {
        error: "Please enter a valid phone number.",
      },
    ),
});

export const personalInfoEditFullNameForm = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, "Please fill out your first name.")
    .max(50, "First name is too long."),
  last_name: z
    .string()
    .trim()
    .min(1, "Please fill out your last name.")
    .max(50, "Last name is too long."),
});

export const personalInfoEditEmailForm = z.object({
  email: z
    .email({ error: "Please enter a valid email address." })
    .min(1, "Email is required."),
});

export type TEditPersonalInfoForm = z.infer<typeof editPersonalInfoForm>;

export type TPersonalInfoEditFullNameForm = z.infer<
  typeof personalInfoEditFullNameForm
>;

export type TPersonalInfoEditEmailForm = z.infer<
  typeof personalInfoEditEmailForm
>;
