import { matchIsValidTel } from "mui-tel-input";
import z from "zod";

export const checkoutPersonalInfoFormSchema = z.object({
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

export const checkoutAddressInfoFormSchema = z.object({
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

export const checkoutDeliveryTimeFormSchema = z
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

export const checkoutOrderNotesFormSchema = z.object({
  notes: z.string().trim().max(160, "Order notes is too long."),
});

export const checkoutPaymentMethodFormSchema = z.object({
  payment_method: z
    .string()
    .trim()
    .min(1, "Please fill out your payment method.")
    .max(50, "Payment method is too long."),
});

export type TCheckoutPersonalInfoFormSchema = z.infer<
  typeof checkoutPersonalInfoFormSchema
>;

export type TCheckoutAddressInfoFormSchema = z.infer<
  typeof checkoutAddressInfoFormSchema
>;

export type TCheckoutDeliveryTimeFormSchema = z.infer<
  typeof checkoutDeliveryTimeFormSchema
>;

export type TCheckoutOrderNotesFormSchema = z.infer<
  typeof checkoutOrderNotesFormSchema
>;

export type TCheckoutPaymentMethodFormSchema = z.infer<
  typeof checkoutPaymentMethodFormSchema
>;
