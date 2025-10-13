import { matchIsValidTel } from "mui-tel-input";
import z from "zod";

export const personalInfoFormSchema = z.object({
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

export const addressInfoFormSchema = z.object({
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

export const deliveryTimeFormSchema = z
  .object({
    delivery_type: z.enum(["asap", "schedule"]).or(z.null()),
    delivery_time: z.string(),
  })
  .refine(
    (data) =>
      data.delivery_type === "asap" ||
      (data.delivery_type === "schedule" && data.delivery_time),
    {
      message: "Please select a delivery time.",
      path: ["delivery_time"],
    },
  );

export const orderNotesFormSchema = z.object({
  notes: z.string().trim().max(160, "Order notes is too long."),
});

export const paymentMethodFormSchema = z.object({
  payment_method: z
    .string()
    .trim()
    .min(1, "Please fill out your payment method.")
    .max(50, "Payment method is too long."),
});

export type TPersonalInfoFormSchema = z.infer<typeof personalInfoFormSchema>;

export type TAddressInfoFormSchema = z.infer<typeof addressInfoFormSchema>;

export type TDeliveryTimeFormSchema = z.infer<typeof deliveryTimeFormSchema>;

export type TOrderNotesFormSchema = z.infer<typeof orderNotesFormSchema>;

export type TPaymentMethodFormSchema = z.infer<typeof paymentMethodFormSchema>;
