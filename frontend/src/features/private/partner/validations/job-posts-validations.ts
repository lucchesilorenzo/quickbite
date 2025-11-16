import z from "zod";

import { employmentTypes } from "../lib/constants/job-posts";

export const addJobPostFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Please fill out your job post title.")
    .max(50, "Job post title is too long."),
  description: z.object({
    html: z.string(),
    text: z
      .string()
      .trim()
      .min(1, "Please fill out your job post description.")
      .max(2000, "Description is too long."),
  }),
  employment_type: z
    .enum(employmentTypes.map((type) => type.value))
    .or(z.literal(""))
    .refine((data) => data !== "", {
      error: "Please select an employment type.",
    }),
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
