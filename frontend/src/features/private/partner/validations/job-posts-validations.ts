import z from "zod";

import { employmentTypes, jobPostStatuses } from "../lib/constants/job-posts";

export const addJobPostFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Please fill out your job post title.")
    .max(50, "Job post title is too long."),
  description_html: z.string(),
  description_text: z
    .string()
    .trim()
    .min(1, "Please fill out your job post description.")
    .max(2000, "Description is too long."),
  employment_type: z
    .enum(
      employmentTypes.map((type) => type.value),
      {
        error: "The option you selected is not valid.",
      },
    )
    .or(z.literal(""))
    .refine((data) => data !== "", {
      error: "Please select an employment type.",
    }),
  salary: z
    .string()
    .trim()
    .refine(
      (data) => data === "" || (!isNaN(Number(data)) && Number(data) > 0),
      "Salary must be a valid number.",
    )
    .transform((data) => (data === "" ? null : Number(data)))
    .refine(
      (data) => data === null || (data >= 10000 && data <= 100000),
      "Salary must be between €10,000 and €100,000 per year.",
    ),
});

export const editJobPostFormSchema = z.object({
  ...addJobPostFormSchema.shape,
  status: z.enum(
    jobPostStatuses.map((status) => status.value),
    {
      error: "The option you selected is not valid.",
    },
  ),
});

export type TAddJobPostFormSchema = z.infer<typeof addJobPostFormSchema>;
export type TEditJobPostFormSchema = z.infer<typeof editJobPostFormSchema>;
