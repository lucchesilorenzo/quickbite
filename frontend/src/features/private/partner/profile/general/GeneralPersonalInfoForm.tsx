import { Stack, TextField, useMediaQuery } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TProfileGeneralFormSchema } from "@partner/schemas/profile-general.schema";
import { format, parseISO } from "date-fns";
import { MuiTelInput } from "mui-tel-input";
import { Controller, useFormContext } from "react-hook-form";

import FormHelperTextError from "@/components/common/FormHelperTextError";

export default function GeneralPersonalInfoForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext<TProfileGeneralFormSchema>();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Stack spacing={4} sx={{ mt: 4 }}>
      <Stack direction={isMobile ? "column" : "row"} spacing={isMobile ? 4 : 2}>
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
            placeholder="eg. 1234567890"
            forceCallingCode
            disableDropdown
            error={!!errors.phone_number}
            fullWidth
            sx={{ minWidth: 150 }}
            helperText={
              errors.phone_number?.message && (
                <FormHelperTextError message={errors.phone_number.message} />
              )
            }
          />
        )}
      />

      <Controller
        name="date_of_birth"
        control={control}
        render={({ field }) => (
          <DatePicker
            minDate={new Date("1900-01-01")}
            maxDate={new Date()}
            format="dd/MM/yyyy"
            label="Date of birth"
            value={field.value ? parseISO(field.value) : null}
            onChange={(date: Date | null) =>
              field.onChange(date ? format(date, "yyyy-MM-dd") : "")
            }
            slotProps={{
              textField: {
                required: true,
                error: !!errors.date_of_birth,
                helperText: errors.date_of_birth?.message && (
                  <FormHelperTextError message={errors.date_of_birth.message} />
                ),
                fullWidth: true,
                sx: { minWidth: 150 },
              },
              field: { clearable: true },
            }}
          />
        )}
      />
    </Stack>
  );
}
