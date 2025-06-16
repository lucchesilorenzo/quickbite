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

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import {
  TCustomerLoginFormSchema,
  customerLoginFormSchema,
} from "@/validations/customer-auth-validations";

export default function CustomerLoginForm() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(customerLoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data: TCustomerLoginFormSchema) {
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

      <Button
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
        loadingIndicator="Logging in..."
        variant="contained"
      >
        Log in
      </Button>
    </Stack>
  );
}
