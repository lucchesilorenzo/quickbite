import z from "zod";

export const editLocationFormSchema = z.object({
  house_number: z.coerce
    .number({
      error: (issue) => {
        if (issue.code === "invalid_type") {
          return { message: "House number must be a number." };
        }
      },
    })
    .int("House number must be an integer.")
    .positive("House number must be a positive number."),
});

export type TEditLocationFormSchema = z.infer<typeof editLocationFormSchema>;
