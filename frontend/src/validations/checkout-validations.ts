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

export const checkoutAddressInfoForm = z.object({
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
});

export const checkoutDeliveryTimeForm = z.object({
  delivery_time: z
    .string()
    .trim()
    .min(1, "Please fill out your delivery time.")
    .max(5, "Delivery time is too long."),
});

export const checkoutOrderNotesForm = z.object({
  notes: z.string().trim().max(160, "Order notes is too long."),
});

export const checkoutPaymentMethodForm = z.object({
  payment_method: z
    .string()
    .trim()
    .min(1, "Please fill out your payment method.")
    .max(50, "Payment method is too long."),
});

export type TCheckoutPersonalInfoForm = z.infer<
  typeof checkoutPersonalInfoForm
>;

export type TCheckoutAddressInfoForm = z.infer<typeof checkoutAddressInfoForm>;

export type TCheckoutDeliveryTimeForm = z.infer<
  typeof checkoutDeliveryTimeForm
>;

export type TCheckoutOrderNotesForm = z.infer<typeof checkoutOrderNotesForm>;

export type TCheckoutPaymentMethodForm = z.infer<
  typeof checkoutPaymentMethodForm
>;
