import { useState } from "react";

import { useLogin } from "@customer/hooks/auth/useLogin";
import { useCreateOrUpdateCarts } from "@customer/hooks/carts/useCreateOrUpdateCarts";
import {
  TLoginFormSchema,
  loginFormSchema,
} from "@customer/validations/auth-validations";
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

import FormHelperTextError from "@/components/common/FormHelperTextError";
import { useMultiCart } from "@/contexts/MultiCartProvider";

export default function LoginForm() {
  const { getCarts } = useMultiCart();

  const { mutateAsync: loginCustomer, isPending: isLoggingIn } = useLogin();
  const { mutateAsync: createOrUpdateCarts } = useCreateOrUpdateCarts();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data: TLoginFormSchema) {
    const guestCarts = getCarts().filter((cart) => cart.items.length > 0);

    await loginCustomer(data);

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
        disabled={isSubmitting || isLoggingIn}
        loading={isSubmitting || isLoggingIn}
        loadingIndicator="Logging in..."
        variant="contained"
      >
        Log in
      </Button>
    </Stack>
  );
}
