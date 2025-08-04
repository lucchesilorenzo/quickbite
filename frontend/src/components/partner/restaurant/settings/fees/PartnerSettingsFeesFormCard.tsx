import {
  Card,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { TPartnerRestaurantSettingsFormSchema } from "@/validations/partner-restaurant-settings-validations";

type PartnerSettingsFeesFormCardProps = {
  editMode: boolean;
};

export default function PartnerSettingsFeesFormCard({
  editMode,
}: PartnerSettingsFeesFormCardProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TPartnerRestaurantSettingsFormSchema>();

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
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

        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Controller
            name="delivery_time_min"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="filled"
                autoComplete="off"
                required
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

          <Typography variant="body1">-</Typography>

          <Controller
            name="delivery_time_max"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="filled"
                autoComplete="off"
                required
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

        <Divider />

        <Typography variant="h6">Other fees</Typography>

        <Stack direction="row" spacing={2}>
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
    </Card>
  );
}
