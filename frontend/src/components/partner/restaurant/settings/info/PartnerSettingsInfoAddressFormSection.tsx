import { Stack, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { usePartnerRestaurantSettingsInfo } from "@/hooks/contexts/private/partner/usePartnerRestaurantSettingsInfo";
import { TRestaurantSettingsInfoFormSchema } from "@/validations/private/partner/restaurant-settings-validations";

export default function PartnerSettingsInfoAddressFormSection() {
  const { editMode } = usePartnerRestaurantSettingsInfo();

  const {
    control,
    formState: { errors },
  } = useFormContext<TRestaurantSettingsInfoFormSchema>();

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Address info</Typography>

      <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
        <Controller
          name="street_address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              variant="filled"
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
              slotProps={{
                input: {
                  readOnly: !editMode,
                },
              }}
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
              minRows={3}
              maxRows={5}
              variant="filled"
              autoComplete="off"
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
              slotProps={{
                input: {
                  readOnly: !editMode,
                },
              }}
            />
          )}
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Controller
          name="postcode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="filled"
              autoComplete="off"
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
              slotProps={{
                input: {
                  readOnly: !editMode,
                },
              }}
            />
          )}
        />

        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="filled"
              autoComplete="off"
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
              slotProps={{
                input: {
                  readOnly: !editMode,
                },
              }}
            />
          )}
        />

        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="filled"
              autoComplete="off"
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
              slotProps={{
                input: {
                  readOnly: !editMode,
                },
              }}
            />
          )}
        />
      </Stack>
    </Stack>
  );
}
