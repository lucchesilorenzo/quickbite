import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { useAuth } from "@/hooks/contexts/useAuth";
import { useUpdateCustomerProfile } from "@/hooks/react-query/private/customers/profile/useUpdateCustomerProfile";
import { isCustomer } from "@/lib/utils";
import {
  TAddressInfoEditStreetAddressFormSchema,
  addressInfoEditStreetAddressFormSchema,
} from "@/validations/personal-info-validations";

export default function AddressInfoEditStreetAddressForm() {
  const { user } = useAuth();
  const { mutateAsync: updateCustomerProfile } = useUpdateCustomerProfile();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    resolver: zodResolver(addressInfoEditStreetAddressFormSchema),
    defaultValues: {
      street_address: isCustomer(user) ? (user.street_address ?? "") : "",
    },
  });

  async function onSubmit(data: TAddressInfoEditStreetAddressFormSchema) {
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
        name="street_address"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            autoComplete="off"
            required
            label="Street address"
            error={!!errors.street_address}
            helperText={
              errors.street_address?.message && (
                <FormHelperTextError message={errors.street_address.message} />
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
          Edit street address
        </Button>
      )}
    </Stack>
  );
}
