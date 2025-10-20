import { useUpdatePersonalInfo } from "@customer/hooks/profile/useUpdatePersonalInfo";
import {
  TEditFullNameFormSchema,
  editFullNameFormSchema,
} from "@customer/validations/profile-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField, useMediaQuery } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import FormHelperTextError from "@/components/FormHelperTextError";
import { useAuth } from "@/contexts/AuthProvider";

export default function PersonalInfoEditFullNameForm() {
  const { user } = useAuth();

  const { mutateAsync: updateCustomerFullName } = useUpdatePersonalInfo();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    resolver: zodResolver(editFullNameFormSchema),
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
    },
  });

  async function onSubmit(data: TEditFullNameFormSchema) {
    await updateCustomerFullName(data);
  }

  return (
    <Stack
      component="form"
      autoComplete="off"
      noValidate
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack direction={isMobile ? "column" : "row"} spacing={isMobile ? 4 : 2}>
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

      {isDirty && (
        <Button
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          loadingIndicator="Editing..."
          variant="contained"
        >
          Edit full name
        </Button>
      )}
    </Stack>
  );
}
