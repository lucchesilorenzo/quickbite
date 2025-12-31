import { TJobPostApplicationFormSchema } from "@rider/schemas/job-post-applications.schema";

export const steps: {
  fields: (keyof TJobPostApplicationFormSchema)[];
}[] = [
  {
    fields: ["first_name", "last_name", "email", "phone_number"],
  },
  {
    fields: ["resume"],
  },
  {
    fields: ["declaration_accepted_at"],
  },
];
