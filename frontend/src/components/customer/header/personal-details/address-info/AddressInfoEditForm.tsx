import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { useAuth } from "@/hooks/contexts/public/useAuth";
import { useUpdateCustomerAddressInfo } from "@/hooks/react-query/private/customers/profile/useUpdateCustomerAddressInfo";
import { isCustomer } from "@/lib/utils";
import {
  TAddressInfoEditFormSchema,
  addressInfoEditFormSchema,
} from "@/validations/personal-info-validations";

export default function AddressInfoEditForm() {
  const { user } = useAuth();
  const { mutateAsync: updateCustomerAddressInfo } =
    useUpdateCustomerAddressInfo();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(addressInfoEditFormSchema),
    defaultValues: {
      street_address: isCustomer(user) ? (user.street_address ?? "") : "",
      building_number: isCustomer(user) ? (user.building_number ?? "") : "",
      postcode: isCustomer(user) ? (user.postcode ?? "") : "",
      city: isCustomer(user) ? (user.city ?? "") : "",
      state: isCustomer(user) ? (user.state ?? "") : "",
    },
  });

  async function onSubmit(data: TAddressInfoEditFormSchema) {
    await updateCustomerAddressInfo(data);
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

      <Controller
        name="state"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            autoComplete="off"
            required
            label="State"
            error={!!errors.state}
            helperText={
              errors.state?.message && (
                <FormHelperTextError message={errors.state.message} />
              )
            }
            fullWidth
            sx={{ minWidth: 150 }}
          />
        )}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
        loadingIndicator="Editing..."
        variant="contained"
      >
        Edit address
      </Button>
    </Stack>
  );
}
