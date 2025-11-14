import z from "zod";

import { employmentTypes } from "../lib/constants/job-posts";

export const addJobPostFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Please fill out your job post title.")
    .max(50, "Job post title is too long."),
  description: z.string().trim().max(200, "Description is too long."),
  employment_type: z.enum(
    employmentTypes.map((type) => type.value),
    {
      error: "Please select a valid employment type.",
    },
  ),
  salary: z.coerce
    .number({
      error: (issue) => {
        if (issue.code === "invalid_type") {
          return { message: "Salary must be a number." };
        }
      },
    })
    .positive("Salary must be a positive number.")
    .nullable(),
});

export type TAddJobPostFormSchema = z.infer<typeof addJobPostFormSchema>;
