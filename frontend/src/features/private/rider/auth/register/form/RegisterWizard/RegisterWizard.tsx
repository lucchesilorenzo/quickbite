import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@mui/material";
import { useRegister } from "@rider/hooks/auth/useRegister";
import { steps } from "@rider/lib/constants/register-wizard/steps";
import {
  TRegisterFormSchema,
  registerFormSchema,
} from "@rider/schemas/auth.schema";
import { FormProvider, useForm } from "react-hook-form";

import Stepper from "../Stepper";
import MobileStepper from "../mobile/MobileStepper";

export default function RegisterWizard() {
  const { mutateAsync: registerRider, isPending: isRegistering } =
    useRegister();

  const [defaultValues] = useState<
    Omit<TRegisterFormSchema, "password" | "password_confirmation">
  >(() => {
    const stored = localStorage.getItem("rider_registration_data");
    return stored
      ? JSON.parse(stored)
      : {
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
        };
  });
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: {
      ...defaultValues,
      password: "",
      password_confirmation: "",
    },
  });

  async function onSubmit(data: TRegisterFormSchema) {
    await registerRider(data);
    localStorage.removeItem("rider_registration_data");
  }

  async function handleNext() {
    const isValid = await methods.trigger(steps[activeStep].fields);
    if (!isValid) return;

    const { password, password_confirmation, ...rest } = methods.getValues();
    localStorage.setItem("rider_registration_data", JSON.stringify(rest));

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
          isRegistering={isRegistering}
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={onSubmit}
        />

        <MobileStepper
          activeStep={activeStep}
          isRegistering={isRegistering}
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={onSubmit}
        />
      </Container>
    </FormProvider>
  );
}
