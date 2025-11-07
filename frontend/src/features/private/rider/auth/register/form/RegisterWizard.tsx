import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@mui/material";
import { stepFields } from "@rider/lib/constants/register-wizard/steps";
import {
  TRegisterFormSchema,
  registerFormSchema,
} from "@rider/validations/auth-validations";
import { FormProvider, useForm } from "react-hook-form";

import Stepper from "./Stepper";
import MobileStepper from "./mobile/MobileStepper";

export default function RegisterWizard() {
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      street_address: "",
      building_number: "",
      postcode: "",
      city: "",
      state: "",
      vehicle_type: undefined,
      password: "",
      password_confirmation: "",
    },
  });

  async function onSubmit(data: TRegisterFormSchema) {
    console.log(data);
  }

  async function handleNext() {
    const isValid = await methods.trigger(stepFields[activeStep]);
    if (!isValid) return;

    setActiveStep((prev) => prev + 1);
  }

  function handleBack() {
    setActiveStep((prev) => prev - 1);
  }

  return (
    <FormProvider {...methods}>
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Stepper
          activeStep={activeStep}
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={onSubmit}
        />

        <MobileStepper
          activeStep={activeStep}
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={onSubmit}
        />
      </Container>
    </FormProvider>
  );
}
