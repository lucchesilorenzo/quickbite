import z from "zod";

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
  .refine((data) => data.delivery_time_min >= data.delivery_time_max, {
    message:
      "Minimum delivery time must be less or equal than delivery time max.",
    path: ["delivery_time_min"],
  });

export type TPartnerRestaurantSettingsFeesFormSchema = z.infer<
  typeof partnerRestaurantSettingsFeesFormSchema
>;
