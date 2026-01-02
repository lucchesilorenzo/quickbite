import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@mui/material";
import { steps } from "@rider/lib/constants/job-application-wizard/steps";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useCreateJobApplication } from "../hooks/job-posts/job-applications/useCreateJobApplication";
import {
  TJobPostApplicationFormSchema,
  jobPostApplicationFormSchema,
} from "../schemas/job-post-applications.schema";
import Stepper from "./Stepper";

export default function JobApplicationWizard() {
  const { jobPostId } = useParams();
  const { mutate: createJobApplication, isPending: isApplying } =
    useCreateJobApplication({ jobPostId: jobPostId! });

  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm({
    resolver: zodResolver(jobPostApplicationFormSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      resume: "",
      declaration_accepted_at: false,
    },
  });

  function onSubmit(data: TJobPostApplicationFormSchema) {
    const formData = new FormData();

    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("phone_number", data.phone_number);
    formData.append("resume", data.resume[0]);
    formData.append(
      "declaration_accepted_at",
      data.declaration_accepted_at.toString(),
    );

    createJobApplication(formData);
  }

  async function handleNext() {
    const isValid = await methods.trigger(steps[activeStep].fields);
    if (!isValid) return;

    setActiveStep((prev) => prev + 1);
  }

  function handleBack(step: number) {
    setActiveStep((prev) => prev - step);
  }

  return (
    <FormProvider {...methods}>
      <Container maxWidth="sm" sx={{ my: 4 }}>
        <Stepper
          activeStep={activeStep}
          isApplying={isApplying}
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={onSubmit}
        />
      </Container>
    </FormProvider>
  );
}
