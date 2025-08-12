import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { useAuth } from "@/hooks/contexts/useAuth";
import { useUpdateCustomerProfile } from "@/hooks/react-query/private/customers/useUpdateCustomerProfile";
import { isCustomer } from "@/lib/utils";
import {
  TAddressInfoEditPostcodeFormSchema,
  addressInfoEditPostcodeFormSchema,
} from "@/validations/personal-info-validations";

export default function AddressInfoEditPostcodeForm() {
  const { user } = useAuth();
  const { mutateAsync: updateCustomerProfile } = useUpdateCustomerProfile();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    resolver: zodResolver(addressInfoEditPostcodeFormSchema),
    defaultValues: {
      postcode: isCustomer(user) ? (user.postcode ?? "") : "",
    },
  });

  async function onSubmit(data: TAddressInfoEditPostcodeFormSchema) {
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
        name="postcode"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            autoComplete="off"
            required
            label="Postcode"
            error={!!errors.postcode}
            helperText={
              errors.postcode?.message && (
                <FormHelperTextError message={errors.postcode.message} />
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
          Edit postcode
        </Button>
      )}
    </Stack>
  );
}
