import { Stack, TextField, useMediaQuery } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import { FormHelperTextError } from "@/components/FormHelperTextError";
import { TProfileGeneralFormSchema } from "@/features/private/partner/validations/profile-general-validations";

export default function GeneralAddressForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext<TProfileGeneralFormSchema>();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Stack spacing={4} sx={{ mt: 4 }}>
      <Stack direction={isMobile ? "column" : "row"} spacing={isMobile ? 4 : 2}>
        <Controller
          name="street_address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              autoComplete="off"
              label="Street address"
              placeholder="eg. Via del Corso"
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
              autoComplete="off"
              label="Building number"
              placeholder="eg. 1"
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

      <Stack direction={isMobile ? "column" : "row"} spacing={isMobile ? 4 : 2}>
        <Controller
          name="postcode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              autoComplete="off"
              label="Postcode"
              placeholder="eg. 00100"
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
              autoComplete="off"
              label="City"
              placeholder="eg. Rome"
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
              autoComplete="off"
              label="State"
              placeholder="eg. Lazio"
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
  );
}
