import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useFees } from "@partner/restaurant/settings/contexts/FeesProvider";
import { TRestaurantSettingsFeesFormSchema } from "@partner/schemas/restaurant-settings.schema";
import { Controller, useFormContext } from "react-hook-form";

import FormHelperTextError from "@/components/common/FormHelperTextError";

export default function FeesFormOtherFeesSection() {
  const { editMode } = useFees();

  const {
    control,
    formState: { errors },
  } = useFormContext<TRestaurantSettingsFeesFormSchema>();

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Other fees</Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Controller
          name="service_fee"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="filled"
              autoComplete="off"
              label="Service fee"
              error={!!errors.service_fee}
              helperText={
                errors.service_fee?.message && (
                  <FormHelperTextError message={errors.service_fee.message} />
                )
              }
              fullWidth
              sx={{ minWidth: 150 }}
              slotProps={{
                input: {
                  readOnly: !editMode,
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                },
              }}
            />
          )}
        />

        <Controller
          name="min_amount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="filled"
              autoComplete="off"
              label="Minimum order amount"
              error={!!errors.min_amount}
              helperText={
                errors.min_amount?.message && (
                  <FormHelperTextError message={errors.min_amount.message} />
                )
              }
              fullWidth
              sx={{ minWidth: 150 }}
              slotProps={{
                input: {
                  readOnly: !editMode,
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
      </Stack>
    </Stack>
  );
}
