import { zodResolver } from "@hookform/resolvers/zod";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, parseISO } from "date-fns";
import { MuiTelInput } from "mui-tel-input";
import { Controller, useForm } from "react-hook-form";

import {
  TCustomerRegisterFormSchema,
  customerRegisterFormSchema,
} from "@/validations/customer-auth-validations";

export default function CustomerRegisterForm() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(customerRegisterFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      date_of_birth: "",
      password: "",
      password_confirmation: "",
    },
  });

  async function onSubmit(data: TCustomerRegisterFormSchema) {
    console.log(data);
  }

  return (
    <Stack
      component="form"
      autoComplete="off"
      noValidate
      spacing={4}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack direction="row" spacing={2}>
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              autoComplete="off"
              label="First name"
              error={!!errors.first_name}
              helperText={
                errors.first_name?.message && (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ErrorOutlineIcon fontSize="small" color="error" />
                    <Typography variant="caption" color="error">
                      {errors.first_name.message}
                    </Typography>
                  </Stack>
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
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
              fullWidth
              sx={{ minWidth: 150 }}
            />
          )}
        />
      </Stack>

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="email"
            autoComplete="off"
            required
            label="Email address"
            error={!!errors.email}
            helperText={errors.email?.message}
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
            helperText={errors.phone_number?.message}
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
                helperText: errors.date_of_birth?.message,
                fullWidth: true,
                sx: { minWidth: 150 },
              },
              field: { clearable: true },
            }}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="password"
            required
            label="Password"
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            sx={{ minWidth: 150 }}
          />
        )}
      />

      <Controller
        name="password_confirmation"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="password"
            required
            label="Confirm password"
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation?.message}
            fullWidth
            sx={{ minWidth: 150 }}
          />
        )}
      />

      <Button type="submit" disabled={isSubmitting} variant="contained">
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </Stack>
  );
}
