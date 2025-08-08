import { matchIsValidTel } from "mui-tel-input";
import z from "zod";

import { discountRates } from "@/lib/data";

const partnerRestaurantSettingsFeesFormDeliverySectionSchema = z.object({
  delivery_fee: z.coerce.number({
    error: (issue) =>
      issue.input === undefined
        ? "Delivery fee is required."
        : "Delivery fee must be a number.",
  }),
  delivery_time_min: z.coerce
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Minimum delivery time is required."
          : "Minimum delivery time must be a number.",
    })
    .positive("Minimum delivery time must be a positive number."),
  delivery_time_max: z.coerce
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Maximum delivery time is required."
          : "Maximum delivery time must be a number.",
    })
    .positive("Maximum delivery time must be a positive number."),
});

const partnerRestaurantSettingsFeesFormDeliveryOtherFeesSchema = z.object({
  service_fee: z.coerce.number({
    error: (issue) =>
      issue.input === undefined
        ? "Service fee is required."
        : "Service fee must be a number.",
  }),
  min_amount: z.coerce.number({
    error: (issue) =>
      issue.input === undefined
        ? "Minimum order amount is required."
        : "Minimum order amount must be a number.",
  }),
});

export const partnerRestaurantSettingsFeesFormSchema = z
  .object({
    ...partnerRestaurantSettingsFeesFormDeliverySectionSchema.shape,
    ...partnerRestaurantSettingsFeesFormDeliveryOtherFeesSchema.shape,
  })
  .refine((data) => data.delivery_time_min <= data.delivery_time_max, {
    message:
      "Minimum delivery time must be less or equal than maximum delivery time.",
    path: ["delivery_time_min"],
  });

export const partnerRestaurantSettingsDeliveryTimesFormSchema = z.object({
  delivery_days: z.array(
    z
      .object({
        day: z.string(),
        start_time: z.date().nullable(),
        end_time: z.date().nullable(),
        enabled: z.boolean(),
      })
      .refine(
        (data) =>
          (data.enabled && data.start_time && data.end_time) ||
          (!data.enabled && !data.start_time && !data.end_time),
        {
          message:
            "Start time and end time must be provided if delivery is enabled.",
          path: ["start_time"],
        },
      )
      .refine(
        (data) =>
          data.start_time === null ||
          data.end_time === null ||
          data.start_time < data.end_time,
        {
          message: "Start time must be before end time.",
          path: ["start_time"],
        },
      ),
  ),
});

export function partnerRestaurantSettingsOffersFormSchema(minAmount: number) {
  return z
    .object({
      discount_rate: z.union([
        z.literal(""),
        ...discountRates.map((rate) => z.literal(rate.value)),
      ]),
      min_discount_amount: z.coerce
        .number({
          error: (issue) =>
            issue.input === undefined
              ? "Minimum discount amount is required."
              : "Minimum discount amount must be a number.",
        })
        .positive("Minimum discount amount must be a positive number."),
    })
    .refine((data) => data.discount_rate, {
      message: "Discount rate is required.",
      path: ["discount_rate"],
    })
    .refine((data) => data.min_discount_amount >= minAmount, {
      message:
        "Minimum discount amount must be greater or equal than the minimum order amount.",
      path: ["min_discount_amount"],
    });
}

export const partnerRestaurantSettingsInfoFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please fill out your name.")
    .max(50, "Name is too long."),
  description: z.string().trim().max(200, "Description is too long."),
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
  email: z
    .email({ error: "Please enter a valid email address." })
    .min(1, "Email is required."),
  phone_number: z
    .string()
    .trim()
    .refine(
      (phone_number) =>
        matchIsValidTel(phone_number, { onlyCountries: ["IT"] }),
      {
        error: "Please enter a valid phone number.",
      },
    ),
  logo: z.union([z.string(), z.instanceof(FileList)]).optional(),
  cover: z.union([z.string(), z.instanceof(FileList)]).optional(),
});

export type TPartnerRestaurantSettingsFeesFormSchema = z.infer<
  typeof partnerRestaurantSettingsFeesFormSchema
>;

export type TPartnerRestaurantSettingsDeliveryTimesFormSchema = z.infer<
  typeof partnerRestaurantSettingsDeliveryTimesFormSchema
>;

export type TPartnerRestaurantSettingsOffersFormSchema = z.infer<
  ReturnType<typeof partnerRestaurantSettingsOffersFormSchema>
>;

export type TPartnerRestaurantSettingsInfoFormSchema = z.infer<
  typeof partnerRestaurantSettingsInfoFormSchema
>;
