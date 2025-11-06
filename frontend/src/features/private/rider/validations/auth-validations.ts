import { matchIsValidTel } from "mui-tel-input";
import z from "zod";

export const registerFormSchema = z.object({
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
  vehicle_type: z.enum(["car", "scooter"], {
    error: "Please select a valid vehicle type.",
  }),
});

export type TRegisterFormSchema = z.infer<typeof registerFormSchema>;
