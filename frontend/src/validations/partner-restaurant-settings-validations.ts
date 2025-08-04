import z from "zod";

export const partnerRestaurantSettingsFormSchema = z.object({
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
          ? "Delivery time is required."
          : "Delivery time must be a number.",
    })
    .positive("Delivery time must be a positive number."),
  delivery_time_max: z.coerce
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Delivery time is required."
          : "Delivery time must be a number.",
    })
    .positive("Delivery time must be a positive number."),
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

export type TPartnerRestaurantSettingsFormSchema = z.infer<
  typeof partnerRestaurantSettingsFormSchema
>;
