import { Box, Stack, TextField, Typography } from "@mui/material";
import { TRegisterFormSchema } from "@rider/schemas/auth.schema";
import { Controller, useFormContext } from "react-hook-form";

import FormHelperTextError from "@/components/common/FormHelperTextError";

export default function PersonalInfoNameSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<TRegisterFormSchema>();

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        What's your name?
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
      </Stack>
    </Box>
  );
}
