import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { useAuth } from "@/hooks/contexts/useAuth";
import { useUpdateCustomerProfile } from "@/hooks/react-query/private/customers/useUpdateCustomerProfile";
import { isCustomer } from "@/lib/utils";
import {
  TAddressInfoEditCityForm,
  addressInfoEditCityForm,
} from "@/validations/personal-info-validations";

export default function AddressInfoEditCityForm() {
  const { user } = useAuth();
  const { mutateAsync: updateCustomerProfile } = useUpdateCustomerProfile();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    resolver: zodResolver(addressInfoEditCityForm),
    defaultValues: {
      city: isCustomer(user) ? (user.city ?? "") : "",
    },
  });

  async function onSubmit(data: TAddressInfoEditCityForm) {
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
      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            autoComplete="off"
            required
            label="City"
            error={!!errors.city}
            helperText={
              errors.city?.message && (
                <FormHelperTextError message={errors.city.message} />
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
          disabled={isSubmitting}
          loading={isSubmitting}
          loadingIndicator="Editing..."
          variant="contained"
        >
          Edit city
        </Button>
      )}
    </Stack>
  );
}
