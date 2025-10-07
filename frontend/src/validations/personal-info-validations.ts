import { matchIsValidTel } from "mui-tel-input";
import z from "zod";

import { isAdult } from "@/lib/utils";

export const personalInfoEditFullNameFormSchema = z.object({
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

export const personalInfoEditEmailFormSchema = z.object({
  email: z
    .email({ error: "Please enter a valid email address." })
    .min(1, "Email is required."),
});

export const personalInfoEditPhoneNumberFormSchema = z.object({
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

export const personalInfoEditDateOfBirthFormSchema = z.object({
  date_of_birth: z
    .string()
    .trim()
    .min(1, "Please fill out your date of birth.")
    .refine((data_of_birth) => isAdult(data_of_birth), {
      error: "You must be at least 18 years old.",
    }),
});

export const addressInfoEditFormSchema = z.object({
  street_address: z
    .string()
    .trim()
    .min(1, "Please fill out your street address.")
    .max(50, "Street address is too long."),
  building_number: z
    .string()
    .trim()
    .min(1, "Please fill out your building number.")
    .max(50, "Building number is too long."),
  postcode: z
    .string()
    .trim()
    .min(1, "Please fill out your postcode.")
    .max(50, "Postcode is too long."),
  city: z
    .string()
    .trim()
    .min(1, "Please fill out your city.")
    .max(50, "City is too long."),
  state: z
    .string()
    .trim()
    .min(1, "Please fill out your state.")
    .max(50, "State is too long."),
});

export type TPersonalInfoEditFullNameFormSchema = z.infer<
  typeof personalInfoEditFullNameFormSchema
>;

export type TPersonalInfoEditEmailFormSchema = z.infer<
  typeof personalInfoEditEmailFormSchema
>;

export type TPersonalInfoEditPhoneNumberFormSchema = z.infer<
  typeof personalInfoEditPhoneNumberFormSchema
>;

export type TPersonalInfoEditDateOfBirthFormSchema = z.infer<
  typeof personalInfoEditDateOfBirthFormSchema
>;

export type PersonalInfoField =
  | TPersonalInfoEditFullNameFormSchema
  | TPersonalInfoEditEmailFormSchema
  | TPersonalInfoEditPhoneNumberFormSchema
  | TPersonalInfoEditDateOfBirthFormSchema;

export type TAddressInfoEditFormSchema = z.infer<
  typeof addressInfoEditFormSchema
>;
