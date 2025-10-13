import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { TRestaurantSettingsFeesFormSchema } from "@partner/validations/restaurant-settings-validations";
import { Controller, useFormContext } from "react-hook-form";

import { FormHelperTextError } from "@/components/FormHelperTextError";
import { useFees } from "@/features/private/partner/restaurant/settings/contexts/FeesProvider";

export default function FeesFormDeliverySection() {
  const { editMode } = useFees();

  const {
    control,
    formState: { errors },
  } = useFormContext<TRestaurantSettingsFeesFormSchema>();

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Delivery</Typography>

      <Controller
        name="delivery_fee"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="filled"
            autoComplete="off"
            label="Delivery fee"
            error={!!errors.delivery_fee}
            helperText={
              errors.delivery_fee?.message && (
                <FormHelperTextError message={errors.delivery_fee.message} />
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

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ alignItems: "center" }}
      >
        <Controller
          name="delivery_time_min"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              variant="filled"
              autoComplete="off"
              label="Min delivery time"
              error={!!errors.delivery_time_min}
              helperText={
                errors.delivery_time_min?.message && (
                  <FormHelperTextError
                    message={errors.delivery_time_min.message}
                  />
                )
              }
              fullWidth
              sx={{ minWidth: 150 }}
              slotProps={{
                input: {
                  readOnly: !editMode,
                  endAdornment: (
                    <InputAdornment position="end">mins</InputAdornment>
                  ),
                },
              }}
            />
          )}
        />

        <Typography
          variant="body1"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          -
        </Typography>

        <Controller
          name="delivery_time_max"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              variant="filled"
              autoComplete="off"
              label="Max delivery time"
              error={!!errors.delivery_time_max}
              helperText={
                errors.delivery_time_max?.message && (
                  <FormHelperTextError
                    message={errors.delivery_time_max.message}
                  />
                )
              }
              fullWidth
              sx={{ minWidth: 150 }}
              slotProps={{
                input: {
                  readOnly: !editMode,
                  endAdornment: (
                    <InputAdornment position="end">mins</InputAdornment>
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
