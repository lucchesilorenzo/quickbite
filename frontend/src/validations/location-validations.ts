import z from "zod";

export const locationEditForm = z.object({
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

export type TLocationEditForm = z.infer<typeof locationEditForm>;
