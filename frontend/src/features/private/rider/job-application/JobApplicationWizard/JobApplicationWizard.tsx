import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@mui/material";
import { steps } from "@rider/lib/constants/job-application-wizard/steps";
import { useNotifications } from "@toolpad/core/useNotifications";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useJobApplication } from "../../contexts/JobApplicationProvider";
import { useCreateJobApplication } from "../../hooks/job-posts/job-applications/useCreateJobApplication";
import {
  TJobApplicationFormSchema,
  jobApplicationFormSchema,
} from "../../schemas/job-applications.schema";
import Stepper from "../Stepper";

export default function JobApplicationWizard() {
  const { jobPostData } = useJobApplication();

  const { mutate: createJobApplication, isPending: isApplying } =
    useCreateJobApplication({ jobPostId: jobPostData!.job_post.id });

  const [activeStep, setActiveStep] = useState(0);

  const navigate = useNavigate();
  const notifications = useNotifications();

  const methods = useForm({
    resolver: zodResolver(jobApplicationFormSchema),
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

  function onSubmit(data: TJobApplicationFormSchema) {
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

  if (jobPostData?.job_post.already_applied) {
    navigate("/rider/job-posts", { replace: true });

    notifications.show("You have already applied for this job.", {
      key: "rider-job-application-already-applied",
      severity: "error",
    });
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
