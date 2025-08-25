import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { useAuth } from "@/hooks/contexts/useAuth";
import { useUpdateCustomerProfile } from "@/hooks/react-query/private/customers/profile/useUpdateCustomerProfile";
import { isCustomer } from "@/lib/utils";
import {
  TAddressInfoEditBuildingNumberFormSchema,
  addressInfoEditBuildingNumberFormSchema,
} from "@/validations/personal-info-validations";

export default function AddressInfoEditBuildingNumberForm() {
  const { user } = useAuth();
  const { mutateAsync: updateCustomerProfile } = useUpdateCustomerProfile();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    resolver: zodResolver(addressInfoEditBuildingNumberFormSchema),
    defaultValues: {
      building_number: isCustomer(user) ? (user.building_number ?? "") : "",
    },
  });

  async function onSubmit(data: TAddressInfoEditBuildingNumberFormSchema) {
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
        name="building_number"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            autoComplete="off"
            required
            label="Building number"
            error={!!errors.building_number}
            helperText={
              errors.building_number?.message && (
                <FormHelperTextError message={errors.building_number.message} />
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
          Edit building number
        </Button>
      )}
    </Stack>
  );
}
