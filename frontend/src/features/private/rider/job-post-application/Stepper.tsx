import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  MobileStepper,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Button from "@mui/material/Button";
import { steps } from "@rider/lib/constants/job-application-wizard/steps";
import { useFormContext } from "react-hook-form";

import { TJobPostApplicationFormSchema } from "../schemas/job-post-applications.schema";
import ContactInfoStep from "./ContactInfoStep";
import RestaurantInfoPanel from "./RestaurantInfoPanel";

type StepperProps = {
  activeStep: number;
  isApplying: boolean;
  onNext: () => void;
  onBack: () => void;
  onSubmit: (data: TJobPostApplicationFormSchema) => void;
};

export default function Stepper({
  activeStep,
  isApplying,
  onNext,
  onBack,
  onSubmit,
}: StepperProps) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<TJobPostApplicationFormSchema>();

  const isPending = isApplying || isSubmitting;
  const isLastStep = activeStep === steps.length - 1;
  const progress = Math.round(((activeStep + 1) / steps.length) * 100);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Stack spacing={2}>
      <RestaurantInfoPanel />

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="caption"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {progress}%
          </Typography>

          <MobileStepper
            variant="progress"
            steps={steps.length}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                endIcon={<KeyboardArrowRight />}
                size={isMobile ? "small" : "medium"}
                onClick={onNext}
                disabled={isLastStep}
              >
                Next
              </Button>
            }
            backButton={
              <Button
                startIcon={<KeyboardArrowLeft />}
                size={isMobile ? "small" : "medium"}
                onClick={onBack}
                disabled={activeStep === 0}
              >
                Back
              </Button>
            }
          />
        </Box>

        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          {activeStep === 0 && <ContactInfoStep />}

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
                Submit your application
              </Button>
            </Box>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
}
