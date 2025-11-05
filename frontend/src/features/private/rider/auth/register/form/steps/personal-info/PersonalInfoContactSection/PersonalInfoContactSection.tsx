import { Box, Stack, TextField, Typography } from "@mui/material";
import { TRegisterFormSchema } from "@rider/validations/auth-validations";
import { MuiTelInput } from "mui-tel-input";
import { Controller, useFormContext } from "react-hook-form";

import FormHelperTextError from "@/components/common/FormHelperTextError";

export default function PersonalInfoContactSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<TRegisterFormSchema>();

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        What's your contact information?
      </Typography>

      <Stack spacing={4}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              autoComplete="off"
              label="Email address"
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
              fullWidth
              sx={{ minWidth: 150 }}
            />
          )}
        />
      </Stack>
    </Box>
  );
}
