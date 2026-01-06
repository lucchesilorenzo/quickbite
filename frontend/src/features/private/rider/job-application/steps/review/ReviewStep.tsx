import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { TJobApplicationFormSchema } from "@rider/schemas/job-applications.schema";
import { Controller, useFormContext } from "react-hook-form";

import ContactInfoSection from "./sections/ContactInfoSection";
import ResumeSection from "./sections/ResumeSection";

import FormHelperTextError from "@/components/common/FormHelperTextError";

type ReviewStepProps = {
  onBack: (step: number) => void;
};

export default function ReviewStep({ onBack }: ReviewStepProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TJobApplicationFormSchema>();

  return (
    <Box>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Review your application
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          You can't edit your application once you submit.
        </Typography>
      </Box>

      <Stack spacing={2}>
        <ContactInfoSection onBack={onBack} />
        <ResumeSection onBack={onBack} />
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Stack spacing={2}>
        <Controller
          name="declaration_accepted_at"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value}
                  onChange={field.onChange}
                  sx={{ pl: 0, py: 0 }}
                />
              }
              label="I declare that the information I have provided is accurate and complete."
              slotProps={{
                typography: { variant: "body2" },
              }}
            />
          )}
        />

        {errors.declaration_accepted_at?.message && (
          <FormHelperTextError
            message={errors.declaration_accepted_at.message}
          />
        )}
      </Stack>
    </Box>
  );
}
