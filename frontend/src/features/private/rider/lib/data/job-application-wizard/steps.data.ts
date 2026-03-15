import { TJobApplicationFormSchema } from "@rider/schemas/job-applications.schema";

export const steps: {
  fields: (keyof TJobApplicationFormSchema)[];
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
