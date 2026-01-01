import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@mui/material";
import { steps } from "@rider/lib/constants/job-application-wizard/steps";
import { FormProvider, useForm } from "react-hook-form";

import {
  TJobPostApplicationFormSchema,
  jobPostApplicationFormSchema,
} from "../schemas/job-post-applications.schema";
import Stepper from "./Stepper";

export default function JobApplicationWizard() {
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

  function onSubmit(data: TJobPostApplicationFormSchema) {}

  async function handleNext() {
    const isValid = await methods.trigger(steps[activeStep].fields);
    if (!isValid) return;

    setActiveStep((prev) => prev + 1);
  }

  function handleBack(step: number = 1) {
    setActiveStep((prev) => prev - step);
  }

  return (
    <FormProvider {...methods}>
      <Container maxWidth="sm" sx={{ my: 4 }}>
        <Stepper
          activeStep={activeStep}
          isApplying={false}
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={onSubmit}
        />
      </Container>
    </FormProvider>
  );
}
