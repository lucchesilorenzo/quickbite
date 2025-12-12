import { useUpdatePersonalInfo } from "@customer/hooks/profile/useUpdatePersonalInfo";
import {
  TEditEmailFormSchema,
  editEmailFormSchema,
} from "@customer/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import FormHelperTextError from "@/components/common/FormHelperTextError";
import { useAuth } from "@/contexts/AuthProvider";

export default function PersonalInfoEditEmailForm() {
  const { user } = useAuth();
  const { mutate: updateCustomerEmail, isPending: isUpdating } =
    useUpdatePersonalInfo();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    resolver: zodResolver(editEmailFormSchema),
    defaultValues: {
      email: user?.email || "",
    },
  });

  function onSubmit(data: TEditEmailFormSchema) {
    updateCustomerEmail(data);
  }

  return (
    <Stack
      component="form"
      autoComplete="off"
      noValidate
      spacing={2}
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

      {isDirty && (
        <Button
          type="submit"
          loading={isSubmitting || isUpdating}
          loadingIndicator="Editing..."
          variant="contained"
        >
          Edit email
        </Button>
      )}
    </Stack>
  );
}
