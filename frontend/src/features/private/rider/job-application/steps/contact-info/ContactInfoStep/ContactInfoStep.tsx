import { Box, Stack, TextField, Typography } from "@mui/material";
import { TJobApplicationFormSchema } from "@rider/schemas/job-applications.schema";
import { MuiTelInput } from "mui-tel-input";
import { Controller, useFormContext } from "react-hook-form";

import FormHelperTextError from "@/components/common/FormHelperTextError";

export default function ContactInfoStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<TJobApplicationFormSchema>();

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Contact information
      </Typography>

      <Stack spacing={4}>
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              autoComplete="off"
              label="First name"
              placeholder="eg. Mario"
              error={!!errors.first_name}
              helperText={
                errors.first_name?.message && (
                  <FormHelperTextError message={errors.first_name.message} />
                )
              }
              fullWidth
              sx={{ minWidth: 150 }}
            />
          )}
        />

        <Controller
          name="last_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="Last name"
              placeholder="eg. Rossi"
              error={!!errors.last_name}
              helperText={
                errors.last_name?.message && (
                  <FormHelperTextError message={errors.last_name.message} />
                )
              }
              fullWidth
              sx={{ minWidth: 150 }}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="Email"
              placeholder="mariorossi@example.com"
              error={!!errors.email}
              helperText={
                errors.email?.message && (
                  <FormHelperTextError message={errors.email.message} />
                )
              }
              fullWidth
              sx={{ minWidth: 150 }}
            />
          )}
        />

        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <MuiTelInput
              {...field}
              required
              placeholder="321 454 2328"
              label="Phone number"
              defaultCountry="IT"
              onlyCountries={["IT"]}
              forceCallingCode
              disableDropdown
              error={!!errors.phone_number}
              helperText={
                errors.phone_number?.message && (
                  <FormHelperTextError message={errors.phone_number.message} />
                )
              }
            />
          )}
        />
      </Stack>
    </Box>
  );
}
