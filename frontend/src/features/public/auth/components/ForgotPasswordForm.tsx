import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import FormHelperTextError from "@/components/common/FormHelperTextError";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import {
  TForgotPasswordFormSchema,
  forgotPasswordFormSchema,
} from "@/schemas/auth.schema";

type ForgotPasswordFormProps = {
  setOpenForgotPasswordDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ForgotPasswordForm({
  setOpenForgotPasswordDialog,
}: ForgotPasswordFormProps) {
  const { mutate: resetPassword, isPending: isSending } = useForgotPassword({
    setOpenForgotPasswordDialog,
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: TForgotPasswordFormSchema) {
    resetPassword(data);
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

      <Button
        type="submit"
        loading={isSubmitting || isSending}
        loadingIndicator="Sending..."
        variant="contained"
      >
        Send email
      </Button>
    </Stack>
  );
}
