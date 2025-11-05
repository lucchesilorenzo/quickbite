import { Box, Stack, TextField, Typography } from "@mui/material";
import { TRegisterFormSchema } from "@rider/validations/auth-validations";
import { Controller, useFormContext } from "react-hook-form";

import FormHelperTextError from "@/components/common/FormHelperTextError";

export default function LocationStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<TRegisterFormSchema>();

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        What's your location?
      </Typography>

      <Stack spacing={4}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 4, sm: 2 }}
        >
          <Controller
            name="street_address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                autoComplete="off"
                label="Street address"
                error={!!errors.street_address}
                helperText={
                  errors.street_address?.message && (
                    <FormHelperTextError
                      message={errors.street_address.message}
                    />
                  )
                }
                fullWidth
                sx={{ minWidth: 150 }}
              />
            )}
          />

          <Controller
            name="building_number"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Building number"
                error={!!errors.building_number}
                helperText={
                  errors.building_number?.message && (
                    <FormHelperTextError
                      message={errors.building_number.message}
                    />
                  )
                }
                fullWidth
                sx={{ minWidth: 150 }}
              />
            )}
          />
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 4, sm: 2 }}
        >
          <Controller
            name="postcode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Postcode"
                error={!!errors.postcode}
                helperText={
                  errors.postcode?.message && (
                    <FormHelperTextError message={errors.postcode.message} />
                  )
                }
                fullWidth
                sx={{ minWidth: 150 }}
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="City"
                error={!!errors.city}
                helperText={
                  errors.city?.message && (
                    <FormHelperTextError message={errors.city.message} />
                  )
                }
                fullWidth
                sx={{ minWidth: 150 }}
              />
            )}
          />

          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="State"
                error={!!errors.state}
                helperText={
                  errors.state?.message && (
                    <FormHelperTextError message={errors.state.message} />
                  )
                }
                fullWidth
                sx={{ minWidth: 150 }}
              />
            )}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
