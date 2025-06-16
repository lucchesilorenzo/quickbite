import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, parseISO } from "date-fns";
import { MuiTelInput } from "mui-tel-input";
import { Controller, useForm } from "react-hook-form";

import { calculatePasswordStrength } from "@/lib/utils";
import {
  TCustomerRegisterFormSchema,
  customerRegisterFormSchema,
} from "@/validations/customer-auth-validations";

export default function CustomerRegisterForm() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    watch,
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

  const password = watch("password");
  const strength = calculatePasswordStrength(password);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

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

      <Stack spacing={2}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type={showPassword ? "text" : "password"}
              required
              label="Password"
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              sx={{ minWidth: 150 }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onMouseDown={() => setShowPassword(true)}
                        onMouseUp={() => setShowPassword(false)}
                        onMouseLeave={() => setShowPassword(false)}
                        onTouchStart={() => setShowPassword(true)}
                        onTouchEnd={() => setShowPassword(false)}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />

        {password && (
          <>
            <LinearProgress
              variant="determinate"
              value={strength}
              sx={{
                borderRadius: 5,
                bgcolor: "#eee",
                "& .MuiLinearProgress-bar": {
                  bgcolor:
                    strength < 50 ? "red" : strength < 80 ? "orange" : "green",
                },
              }}
            />

            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2" component="div">
                Password strength:
              </Typography>

              <Typography
                variant="body2"
                component="span"
                sx={{ fontWeight: 700 }}
              >
                {strength < 50
                  ? "Too weak"
                  : strength < 80
                    ? "Medium"
                    : "Strong"}
              </Typography>
            </Stack>
          </>
        )}
      </Stack>

      <Controller
        name="password_confirmation"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type={showPasswordConfirmation ? "text" : "password"}
            required
            label="Confirm password"
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation?.message}
            fullWidth
            sx={{ minWidth: 150 }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onMouseDown={() => setShowPasswordConfirmation(true)}
                      onMouseUp={() => setShowPasswordConfirmation(false)}
                      onMouseLeave={() => setShowPasswordConfirmation(false)}
                      onTouchStart={() => setShowPasswordConfirmation(true)}
                      onTouchEnd={() => setShowPasswordConfirmation(false)}
                    >
                      {showPasswordConfirmation ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />

      <Button type="submit" disabled={isSubmitting} variant="contained">
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </Stack>
  );
}
