import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { useAuth } from "@/hooks/contexts/useAuth";
import { useUpdateCustomerProfile } from "@/hooks/react-query/private/customers/useUpdateCustomerProfile";
import { isCustomer } from "@/lib/utils";
import {
  TPersonalInfoEditFullNameForm,
  personalInfoEditFullNameForm,
} from "@/validations/personal-info-validations";

export default function PersonalInfoEditFullNameForm() {
  const { user } = useAuth();
  const { mutateAsync: updateCustomerProfile } = useUpdateCustomerProfile();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    resolver: zodResolver(personalInfoEditFullNameForm),
    defaultValues: {
      first_name: isCustomer(user) ? user.first_name : "",
      last_name: isCustomer(user) ? user.last_name : "",
    },
  });

  async function onSubmit(data: TPersonalInfoEditFullNameForm) {
    await updateCustomerProfile(data);
  }

  return (
    <Stack
      component="form"
      autoComplete="off"
      noValidate
      spacing={2}
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
