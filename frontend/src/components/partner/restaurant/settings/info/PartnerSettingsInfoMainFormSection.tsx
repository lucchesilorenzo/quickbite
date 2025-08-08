import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { Controller, useFormContext } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import VisuallyHiddenInput from "@/components/common/VisuallyHiddenInput";
import { usePartnerRestaurantSettingsInfo } from "@/hooks/contexts/usePartnerRestaurantSettingsInfo";
import { TPartnerRestaurantSettingsInfoFormSchema } from "@/validations/partner-restaurant-settings-validations";

export default function PartnerSettingsInfoMainFormSection() {
  const { editMode } = usePartnerRestaurantSettingsInfo();

  const {
    control,
    formState: { errors },
  } = useFormContext<TPartnerRestaurantSettingsInfoFormSchema>();

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Main info</Typography>

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="filled"
            autoComplete="off"
            label="Business name"
            error={!!errors.name}
            helperText={
              errors.name?.message && (
                <FormHelperTextError message={errors.name.message} />
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
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            multiline
            minRows={3}
            maxRows={5}
            variant="filled"
            autoComplete="off"
            label="Description"
            error={!!errors.description}
            helperText={
              errors.description?.message && (
                <FormHelperTextError message={errors.description.message} />
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

      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="filled"
              autoComplete="off"
              required
              label="Email address"
              error={!!errors.email}
              helperText={
                errors.email?.message && (
                  <FormHelperTextError message={errors.email.message} />
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
          name="phone_number"
          control={control}
          render={({ field }) => (
            <MuiTelInput
              {...field}
              required
              variant="filled"
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
              slotProps={{
                input: {
                  readOnly: !editMode,
                },
              }}
            />
          )}
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <Controller
          name="logo"
          control={control}
          render={({ field }) => (
            <Button
              {...field}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              disabled={!editMode}
            >
              Upload logo
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    field.onChange(e.target.files);
                  }
                }}
              />
            </Button>
          )}
        />

        <Controller
          name="cover"
          control={control}
          render={({ field }) => (
            <Button
              {...field}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              disabled={!editMode}
            >
              Upload cover
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    field.onChange(e.target.files);
                  }
                }}
              />
            </Button>
          )}
        />
      </Stack>
    </Stack>
  );
}
