import { matchIsValidTel } from "mui-tel-input";
import { z } from "zod/v4";

import { isAdult } from "@/lib/utils";

export const customerRegisterFormSchema = z
  .object({
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
      .min(1, "Phone number is required.")
      .refine(
        (phone_number) =>
          matchIsValidTel(phone_number, { onlyCountries: ["IT"] }),
        {
          error: "Please enter a valid phone number.",
        },
      ),
    date_of_birth: z
      .string()
      .trim()
      .min(1, "Date of birth is required.")
      .refine((data_of_birth) => isAdult(data_of_birth), {
        error: "You must be at least 18 years old.",
      }),
    password: z
      .string()
      .trim()
      .min(
        8,
        "Your password should be at least 8 characters long, contain both lower and upper-case letters, and include either a number or a symbol.",
      )
      .max(50, "Password is too long."),
    password_confirmation: z
      .string()
      .trim()
      .min(
        8,
        "Your password should be at least 8 characters long, contain both lower and upper-case letters, and include either a number or a symbol.",
      )
      .max(50, "Password is too long."),
  })
  .refine((data) => data.password === data.password_confirmation, {
    error: "Passwords do not match.",
    path: ["password_confirmation"],
  });

export type TCustomerRegisterFormSchema = z.infer<
  typeof customerRegisterFormSchema
>;
