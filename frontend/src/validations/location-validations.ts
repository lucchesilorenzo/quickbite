import { z } from "zod/v4";

export const editLocationForm = z.object({
  house_number: z.coerce
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "House number is required."
          : "House number must be a number.",
    })
    .int("House number must be an integer.")
    .positive("House number must be a positive number."),
});

export type TEditLocationForm = z.infer<typeof editLocationForm>;
