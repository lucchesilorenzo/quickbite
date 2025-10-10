import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, parseISO } from "date-fns";
import { MuiTelInput } from "mui-tel-input";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import PasswordStrengthIndicator from "@/components/common/PasswordStrengthIndicator";
import { useRegister } from "@/hooks/react-query/private/partner/auth/useRegister";
import { calculatePasswordStrength } from "@/lib/utils";
import {
  TRegisterFormSchema,
  registerFormSchema,
} from "@/validations/private/partner/auth-validations";

export default function RegisterForm() {
  const { mutateAsync: registerPartner, isPending: isRegistering } =
    useRegister();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    watch,
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      business_name: "",
      street_address: "",
      building_number: "",
      postcode: "",
      city: "",
      state: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      date_of_birth: "",
      password: "",
      password_confirmation: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const password = watch("password");
  const strength = calculatePasswordStrength(password);

  async function onSubmit(data: TRegisterFormSchema) {
    await registerPartner(data);
  }

  return (
    <Stack
      component="form"
      autoComplete="off"
      noValidate
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <StoreIcon />

        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          Business info
        </Typography>
      </Stack>

      <Stack spacing={4}>
        <Controller
          name="business_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              autoComplete="off"
              label="Business name"
              placeholder="eg. McDonald's"
              error={!!errors.business_name}
              helperText={
                errors.business_name?.message && (
                  <FormHelperTextError message={errors.business_name.message} />
                )
              }
              fullWidth
              sx={{ minWidth: 150 }}
            />
          )}
        />

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

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        sx={{ alignItems: { sm: "center" }, py: 1 }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <PersonIcon />

          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Owner info
          </Typography>
        </Stack>

        <Typography variant="body2">
          Details of the legal owner of the business
        </Typography>
      </Stack>

      <Stack spacing={4}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 4, sm: 2 }}
        >
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

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 4, sm: 2 }}
        >
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
                placeholder="eg. mario.rossi@gmail.com"
                error={!!errors.email}
                helperText={
                  errors.email?.message && (
                    <FormHelperTextError message={errors.email.message} />
                  )
                }
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
                placeholder="eg. 1234567890"
                forceCallingCode
                disableDropdown
                error={!!errors.phone_number}
                fullWidth
                sx={{ minWidth: 150 }}
                helperText={
                  errors.phone_number?.message && (
                    <FormHelperTextError
                      message={errors.phone_number.message}
                    />
                  )
                }
              />
            )}
          />
        </Stack>

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
                    <FormHelperTextError
                      message={errors.date_of_birth.message}
                    />
                  ),
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
                helperText={
                  errors.password?.message && (
                    <FormHelperTextError message={errors.password.message} />
                  )
                }
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

          {password && <PasswordStrengthIndicator strength={strength} />}
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
              helperText={
                errors.password_confirmation?.message && (
                  <FormHelperTextError
                    message={errors.password_confirmation.message}
                  />
                )
              }
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

        <Button
          type="submit"
          disabled={isSubmitting || isRegistering}
          loading={isSubmitting || isRegistering}
          loadingIndicator="Submitting..."
          variant="contained"
          sx={{
            bgcolor: "#212121",
            color: "white",
            "&:hover": { bgcolor: "#333333" },
          }}
        >
          Start application
        </Button>
      </Stack>
    </Stack>
  );
}
