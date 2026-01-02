import { CreateJobApplicationResponse } from "@rider/types/job-posts/job-applications/job-application.api.types";
import { apiResponse } from "@tests/mocks/data/shared/common";

export function createJobApplicationFormData() {
  const formData = new FormData();

  const file = new File(["resume"], "resume.pdf", { type: "application/pdf" });

  formData.append("first_name", "John");
  formData.append("last_name", "Doe");
  formData.append("email", "johndoe@gmail.com");
  formData.append("phone_number", "+39 373 332 3323");
  formData.append("resume", file);
  formData.append("declaration_accepted_at", "true");

  return formData;
}

export const jobApplicationWizardFormResponse: CreateJobApplicationResponse = {
  ...apiResponse,
  job_application: {
    id: "019b7bdc-4cd8-7370-947b-3daa3938cc7c",
    job_post_id: "019b710a-1748-71d8-bb2d-2e02aba7c22f",
    rider_id: "019b7102-a604-7285-9476-06c533863967",
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@gmail.com",
    phone_number: "+39 373 332 3323",
    resume:
      "/storage/job-applications/Yvy26WoGylWCAhtl0pMnFQWrQTsErcVQQnvz2hhj.pdf",
    status: "pending",
    declaration_accepted_at: "2026-01-01T23:19:53.816215Z",
    updated_at: "2026-01-01T23:19:53.000000Z",
    created_at: "2026-01-01T23:19:53.000000Z",
  },
};
