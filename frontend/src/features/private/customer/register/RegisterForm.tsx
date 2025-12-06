import { useState } from "react";

import { useRegister } from "@customer/hooks/auth/useRegister";
import { useCreateOrUpdateCarts } from "@customer/hooks/carts/useCreateOrUpdateCarts";
import {
  TRegisterFormSchema,
  registerFormSchema,
} from "@customer/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, parseISO } from "date-fns";
import { MuiTelInput } from "mui-tel-input";
import { Controller, useForm, useWatch } from "react-hook-form";

import FormHelperTextError from "@/components/common/FormHelperTextError";
import PasswordStrengthIndicator from "@/components/common/PasswordStrengthIndicator";
import { useMultiCart } from "@/contexts/MultiCartProvider";
import { calculatePasswordStrength } from "@/lib/utils/validation";

export default function RegisterForm() {
  const { getCarts } = useMultiCart();

  const { mutateAsync: registerCustomer, isPending: isRegistering } =
    useRegister();
  const { mutateAsync: createOrUpdateCarts } = useCreateOrUpdateCarts();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
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

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const password = useWatch({ control, name: "password" });
  const strength = calculatePasswordStrength(password);

  async function onSubmit(data: TRegisterFormSchema) {
    const guestCarts = getCarts().filter((cart) => cart.items.length > 0);

    await registerCustomer(data);

    if (guestCarts.length > 0) {
      await createOrUpdateCarts(guestCarts);
    }

    localStorage.removeItem("carts");
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
            forceCallingCode
            disableDropdown
            error={!!errors.phone_number}
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
        loadingIndicator="Creating account..."
        variant="contained"
      >
        Create account
      </Button>
    </Stack>
  );
}
