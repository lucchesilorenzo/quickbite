import { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import FormHelperTextError from "@/components/common/FormHelperTextError";
import PasswordStrengthIndicator from "@/components/common/PasswordStrengthIndicator";
import { TRegisterFormSchema } from "@/features/private/rider/schemas/auth.schema";
import { calculatePasswordStrength } from "@/lib/utils/validation";

export default function AccountSecurityStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<TRegisterFormSchema>();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const password = useWatch({ control, name: "password" });
  const strength = calculatePasswordStrength(password);

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", fontWeight: 600, mb: 3 }}
      >
        Choose a password to secure your account
      </Typography>

      <Stack spacing={4}>
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
                        onClick={() => setShowPassword((show) => !show)}
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
                        onClick={() =>
                          setShowPasswordConfirmation((show) => !show)
                        }
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
      </Stack>
    </Box>
  );
}
