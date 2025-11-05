import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Container,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import {
  TRegisterFormSchema,
  registerFormSchema,
} from "@rider/validations/auth-validations";
import { FormProvider, useForm } from "react-hook-form";

import LocationStep from "./steps/location/LocationStep";
import PersonalInfoStep from "./steps/personal-info/PersonalInfoStep";
import RequirementsStep from "./steps/requirements/RequirementsStep";

const steps = [
  { title: "Step 1", subtitle: "Requirements" },
  { title: "Step 2", subtitle: "Personal info" },
  { title: "Step 3", subtitle: "Location" },
  { title: "Step 4", subtitle: "Vehicle" },
];

const stepFields: Record<number, (keyof TRegisterFormSchema)[]> = {
  0: [],
  1: ["first_name", "last_name", "email", "phone_number"],
  2: ["street_address", "building_number", "postcode", "city", "state"],
};

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
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map(({ title, subtitle }) => (
            <Step key={title}>
              <StepLabel>{title}</StepLabel>
              <Typography variant="caption">{subtitle}</Typography>
            </Step>
          ))}
        </Stepper>

        <Container maxWidth="md">
          <Stack
            component="form"
            onSubmit={methods.handleSubmit(onSubmit)}
            autoComplete="off"
            noValidate
          >
            {activeStep === 0 && <RequirementsStep />}
            {activeStep === 1 && <PersonalInfoStep />}
            {activeStep === 2 && <LocationStep />}

            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", mt: 6 }}
            >
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                sx={{ px: 5, fontWeight: 700 }}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Previous
              </Button>

              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 5, fontWeight: 700 }}
                onClick={handleNext}
              >
                Next
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Container>
    </FormProvider>
  );
}
