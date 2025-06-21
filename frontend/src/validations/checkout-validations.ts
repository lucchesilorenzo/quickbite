import { matchIsValidTel } from "mui-tel-input";
import { z } from "zod/v4";

export const checkoutPersonalInfoForm = z.object({
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

export type TCheckoutPersonalInfoForm = z.infer<
  typeof checkoutPersonalInfoForm
>;
