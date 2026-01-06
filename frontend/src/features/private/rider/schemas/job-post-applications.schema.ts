import { matchIsValidTel } from "mui-tel-input";
import z from "zod";

export const jobPostApplicationFormSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, "Please fill out your first name.")
    .max(50, "First name is too long."),
  last_name: z
    .string()
    .trim()
    .min(1, "Please fill out your last name.")
    .max(50, "Last name is too long."),
  email: z.email({ error: "Please enter a valid email address." }),
  phone_number: z
    .string()
    .trim()
    .min(1, "Please fill out your phone number.")
    .refine(
      (phone_number) =>
        matchIsValidTel(phone_number, { onlyCountries: ["IT"] }),
      {
        error: "Please enter a valid phone number.",
      },
    ),
  resume: z
    .union([z.string(), z.instanceof(FileList), z.array(z.instanceof(File))])
    .check((ctx) => {
      const files =
        ctx.value instanceof FileList
          ? Array.from(ctx.value)
          : Array.isArray(ctx.value)
            ? ctx.value
            : [];

      if (files.length === 0) {
        ctx.issues.push({
          code: "custom",
          message: "Please upload your resume.",
          input: ctx.value,
        });
        return;
      }

      if (files[0].type !== "application/pdf") {
        ctx.issues.push({
          code: "custom",
          message: "Only PDF files are allowed.",
          input: ctx.value,
        });
      }
    }),
  declaration_accepted_at: z.boolean().refine((value) => value, {
    error: "Declaration is required.",
  }),
});

export type TJobPostApplicationFormSchema = z.infer<
  typeof jobPostApplicationFormSchema
>;
