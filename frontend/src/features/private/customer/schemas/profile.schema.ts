import { matchIsValidTel } from "mui-tel-input";
import z from "zod";

import { isAdult } from "@/lib/utils/validation";

export const editFullNameFormSchema = z.object({
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

export const editEmailFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email address." }),
});

export const editPhoneNumberFormSchema = z.object({
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

export const editDateOfBirthFormSchema = z.object({
  date_of_birth: z
    .string()
    .trim()
    .min(1, "Please fill out your date of birth.")
    .refine((data_of_birth) => isAdult(data_of_birth), {
      error: "You must be at least 18 years old.",
    }),
});

export const editAddressFormSchema = z.object({
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

export type TEditFullNameFormSchema = z.infer<typeof editFullNameFormSchema>;

export type TEditEmailFormSchema = z.infer<typeof editEmailFormSchema>;

export type TEditPhoneNumberFormSchema = z.infer<
  typeof editPhoneNumberFormSchema
>;

export type TEditDateOfBirthFormSchema = z.infer<
  typeof editDateOfBirthFormSchema
>;

export type TEditAddressFormSchema = z.infer<typeof editAddressFormSchema>;

export type TEditPersonalInfoField =
  | TEditFullNameFormSchema
  | TEditEmailFormSchema
  | TEditPhoneNumberFormSchema
  | TEditDateOfBirthFormSchema;
