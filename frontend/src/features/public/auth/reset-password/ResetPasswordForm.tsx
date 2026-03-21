import { useState } from "react";

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
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import FormHelperTextError from "@/components/common/FormHelperTextError";
import { useResetPassword } from "@/hooks/auth/useResetPassword";
import {
  TResetPasswordFormSchema,
  resetPasswordFormSchema,
} from "@/schemas/auth.schema";

export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();

  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: searchParams.get("email") || "",
      password: "",
      password_confirmation: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  function onSubmit(data: TResetPasswordFormSchema) {
    resetPassword({ ...data, token: searchParams.get("token") || "" });
  }

  return (
    <Stack
      component="form"
      autoComplete="off"
      noValidate
      spacing={4}
      onSubmit={handleSubmit(onSubmit)}
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
        loading={isSubmitting || isResetting}
        loadingIndicator="Submitting..."
        variant="contained"
      >
        Submit
      </Button>
    </Stack>
  );
}
