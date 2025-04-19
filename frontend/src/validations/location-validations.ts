import { z } from "zod";

export const locationEditForm = z.object({
  house_number: z.coerce
    .number({
      invalid_type_error: "House number must be a number.",
      required_error: "House number is required.",
    })
    .int("House number must be an integer.")
    .positive("House number must be a positive number."),
});

export type TLocationEditForm = z.infer<typeof locationEditForm>;
