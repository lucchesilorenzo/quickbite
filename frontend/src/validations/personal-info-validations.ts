import { matchIsValidTel } from "mui-tel-input";
import { z } from "zod/v4";

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

export const personalInfoEditPhoneNumberForm = z.object({
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

export const addressInfoEditStreetAddressForm = z.object({
  street_address: z
    .string()
    .trim()
    .min(1, "Please fill out your street address.")
    .max(50, "Street address is too long."),
});

export type TPersonalInfoEditFullNameForm = z.infer<
  typeof personalInfoEditFullNameForm
>;

export type TPersonalInfoEditEmailForm = z.infer<
  typeof personalInfoEditEmailForm
>;

export type TPersonalInfoEditPhoneNumberForm = z.infer<
  typeof personalInfoEditPhoneNumberForm
>;

export type TAddressInfoEditStreetAddressForm = z.infer<
  typeof addressInfoEditStreetAddressForm
>;
