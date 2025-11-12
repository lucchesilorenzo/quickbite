import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Box, MobileStepper as MuiMobileStepper, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { steps } from "@rider/lib/constants/register-wizard/steps";
import { TRegisterFormSchema } from "@rider/validations/auth-validations";
import { useFormContext } from "react-hook-form";

import AccountSecurityStep from "../../steps/account-security/AccountSecurityStep";
import FinishYourRegistrationStep from "../../steps/finish-your-registration/FinishYourRegistrationStep";
import LocationStep from "../../steps/location/LocationStep";
import PersonalInfoStep from "../../steps/personal-info/PersonalInfoStep";
import RequirementsStep from "../../steps/requirements/RequirementsStep";
import VehicleStep from "../../steps/vehicle/VehicleStep";

type MobileStepperProps = {
  activeStep: number;
  isRegistering: boolean;
  onNext: () => void;
  onBack: () => void;
  onSubmit: (data: TRegisterFormSchema) => void;
};

export default function MobileStepper({
  activeStep,
  isRegistering,
  onNext,
  onBack,
  onSubmit,
}: MobileStepperProps) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<TRegisterFormSchema>();

  const isPending = isRegistering || isSubmitting;
  const isLastStep = activeStep === steps.length - 1;

  return (
    <Box sx={{ display: { xs: "block", md: "none" } }}>
      <MuiMobileStepper
        variant="progress"
        steps={steps.length}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={onNext} disabled={isLastStep}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={onBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />

      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        {activeStep === 0 && <RequirementsStep />}
        {activeStep === 1 && <PersonalInfoStep />}
        {activeStep === 2 && <LocationStep />}
        {activeStep === 3 && <VehicleStep />}
        {activeStep === 4 && <AccountSecurityStep />}
        {activeStep === 5 && <FinishYourRegistrationStep />}

        {isLastStep && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 5, fontWeight: 700 }}
              loading={isPending}
              loadingIndicator="Submitting..."
            >
              Submit
            </Button>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
