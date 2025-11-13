import { matchIsValidTel } from "mui-tel-input";
import z from "zod";

import { isAdult } from "@/lib/utils/validation";

export const registerFormSchema = z
  .object({
    business_name: z
      .string()
      .trim()
      .min(1, "Please fill out your business name.")
      .max(50, "Business name is too long."),
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
    email: z.email({ error: "Please enter a valid email address." }),
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
    date_of_birth: z
      .string()
      .trim()
      .min(1, "Please fill out your date of birth.")
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
      .max(50, "Password is too long.")
      .check((ctx) => {
        if (!/[A-Z]/.test(ctx.value)) {
          ctx.issues.push({
            code: "custom",
            message: "Password must contain at least one uppercase letter.",
            input: ctx.value,
          });
        }

        if (!/[a-z]/.test(ctx.value)) {
          ctx.issues.push({
            code: "custom",
            message: "Password must contain at least one lowercase letter.",
            input: ctx.value,
          });
        }

        if (!/[0-9]/.test(ctx.value)) {
          ctx.issues.push({
            code: "custom",
            message: "Password must contain at least one number.",
            input: ctx.value,
          });
        }

        if (!/[^A-Za-z0-9]/.test(ctx.value)) {
          ctx.issues.push({
            code: "custom",
            message: "Password must contain at least one special character.",
            input: ctx.value,
          });
        }
      }),
    password_confirmation: z
      .string()
      .trim()
      .min(
        8,
        "Your password should be at least 8 characters long, contain both lower and upper-case letters, and include either a number or a symbol.",
      )
      .max(50, "Password is too long.")
      .check((ctx) => {
        if (!/[A-Z]/.test(ctx.value)) {
          ctx.issues.push({
            code: "custom",
            message: "Password must contain at least one uppercase letter.",
            input: ctx.value,
          });
        }

        if (!/[a-z]/.test(ctx.value)) {
          ctx.issues.push({
            code: "custom",
            message: "Password must contain at least one lowercase letter.",
            input: ctx.value,
          });
        }

        if (!/[0-9]/.test(ctx.value)) {
          ctx.issues.push({
            code: "custom",
            message: "Password must contain at least one number.",
            input: ctx.value,
          });
        }

        if (!/[^A-Za-z0-9]/.test(ctx.value)) {
          ctx.issues.push({
            code: "custom",
            message: "Password must contain at least one special character.",
            input: ctx.value,
          });
        }
      }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    error: "Passwords do not match.",
    path: ["password_confirmation"],
  });

export const loginFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email address." }),
  password: z.string().min(1, "Please fill out your password."),
});

export type TRegisterFormSchema = z.infer<typeof registerFormSchema>;

export type TLoginFormSchema = z.infer<typeof loginFormSchema>;
