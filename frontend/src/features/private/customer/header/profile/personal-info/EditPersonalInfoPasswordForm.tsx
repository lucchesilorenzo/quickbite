import { useState } from "react";

import { useUpdatePersonalInfo } from "@customer/hooks/profile/useUpdatePersonalInfo";
import {
  TEditPasswordFormSchema,
  editPasswordFormSchema,
} from "@customer/schemas/profile.schema";
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
import { Controller, useForm, useWatch } from "react-hook-form";

import FormHelperTextError from "@/components/common/FormHelperTextError";
import PasswordStrengthIndicator from "@/components/common/PasswordStrengthIndicator";
import { calculatePasswordStrength } from "@/lib/utils/validation";

export default function EditPersonalInfoPassswordForm() {
  const { mutate: updatePassword, isPending: isUpdating } =
    useUpdatePersonalInfo();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    resolver: zodResolver(editPasswordFormSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const password = useWatch({ control, name: "password" });
  const strength = calculatePasswordStrength(password);

  function onSubmit(data: TEditPasswordFormSchema) {
    updatePassword(data);
  }

  return (
    <Stack
      component="form"
      autoComplete="off"
      noValidate
      spacing={4}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={2}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type={showPassword ? "text" : "password"}
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

      {isDirty && (
        <Button
          type="submit"
          loading={isSubmitting || isUpdating}
          loadingIndicator="Updating..."
          variant="contained"
        >
          Update password
        </Button>
      )}
    </Stack>
  );
}
