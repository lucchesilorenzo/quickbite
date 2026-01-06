import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { Box, Button, Stack, Typography } from "@mui/material";
import { TJobPostApplicationFormSchema } from "@rider/schemas/job-post-applications.schema";
import { Controller, useFormContext } from "react-hook-form";

import ResumePreview from "../ResumePreview";

import FormHelperTextError from "@/components/common/FormHelperTextError";
import VisuallyHiddenInput from "@/components/common/VisuallyHiddenInput";

export default function ResumeStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<TJobPostApplicationFormSchema>();

  function handleFileUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (value: FileList) => void,
  ) {
    if (e.target.files && e.target.files.length > 0) {
      fieldOnChange(e.target.files);
    }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Add your resume for the employer to review
      </Typography>

      <ResumePreview />

      <Stack spacing={2}>
        <Controller
          name="resume"
          control={control}
          render={({ field }) => (
            <Button
              component="label"
              variant="outlined"
              tabIndex={-1}
              fullWidth
              startIcon={<UploadFileOutlinedIcon />}
            >
              {field.value.length > 0 ? "Upload a new file" : "Upload file"}
              <VisuallyHiddenInput
                type="file"
                aria-label="Upload resume"
                accept="application/pdf"
                onChange={(e) => handleFileUpload(e, field.onChange)}
              />
            </Button>
          )}
        />

        {errors.resume?.message && (
          <FormHelperTextError message={errors.resume.message} />
        )}
      </Stack>
    </Box>
  );
}
