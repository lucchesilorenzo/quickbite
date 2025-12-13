import {
  Box,
  Button,
  Container,
  Stepper as MuiStepper,
  Stack,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { steps } from "@rider/lib/constants/register-wizard/steps";
import { TRegisterFormSchema } from "@rider/schemas/auth.schema";
import { useFormContext } from "react-hook-form";

import AccountSecurityStep from "../steps/account-security/AccountSecurityStep";
import FinishYourRegistrationStep from "../steps/finish-your-registration/FinishYourRegistrationStep";
import LocationStep from "../steps/location/LocationStep";
import PersonalInfoStep from "../steps/personal-info/PersonalInfoStep";
import RequirementsStep from "../steps/requirements/RequirementsStep";
import VehicleStep from "../steps/vehicle/VehicleStep";

type StepperProps = {
  activeStep: number;
  isRegistering: boolean;
  onNext: () => void;
  onBack: () => void;
  onSubmit: (data: TRegisterFormSchema) => void;
};

export default function Stepper({
  activeStep,
  isRegistering,
  onNext,
  onBack,
  onSubmit,
}: StepperProps) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<TRegisterFormSchema>();

  const isPending = isRegistering || isSubmitting;
  const isLastStep = activeStep === steps.length - 1;

  return (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <MuiStepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map(({ title, subtitle }) => (
          <Step key={title}>
            <StepLabel>{title}</StepLabel>
            <Typography variant="caption">{subtitle}</Typography>
          </Step>
        ))}
      </MuiStepper>

      <Container maxWidth="md">
        <Stack component="form" autoComplete="off" noValidate>
          {activeStep === 0 && <RequirementsStep />}
          {activeStep === 1 && <PersonalInfoStep />}
          {activeStep === 2 && <LocationStep />}
          {activeStep === 3 && <VehicleStep />}
          {activeStep === 4 && <AccountSecurityStep />}
          {activeStep === 5 && <FinishYourRegistrationStep />}

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
              onClick={onBack}
            >
              Previous
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 5, fontWeight: 700 }}
              loading={isLastStep && isPending}
              loadingIndicator="Submitting..."
              onClick={isLastStep ? handleSubmit(onSubmit) : onNext}
            >
              {isLastStep ? "Submit" : "Next"}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
