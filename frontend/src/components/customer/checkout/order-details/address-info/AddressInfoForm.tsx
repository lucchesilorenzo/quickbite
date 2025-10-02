import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { useCustomerCheckout } from "@/hooks/contexts/private/customer/useCustomerCheckout";
import { useAuth } from "@/hooks/contexts/public/useAuth";
import {
  TCheckoutAddressInfoFormSchema,
  checkoutAddressInfoFormSchema,
} from "@/validations/checkout-validations";

type AddressInfoFormProps = {
  setOpenAddressInfoDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddressInfoForm({
  setOpenAddressInfoDialog,
}: AddressInfoFormProps) {
  const { user } = useAuth();
  const { checkoutData, restaurantId, setCheckoutData } = useCustomerCheckout();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(checkoutAddressInfoFormSchema),
    defaultValues: {
      street_address:
        checkoutData[restaurantId].address_info.street_address ||
        user?.street_address ||
        "",
      building_number:
        checkoutData[restaurantId].address_info.building_number ||
        user?.building_number ||
        "",
      postcode:
        checkoutData[restaurantId].address_info.postcode ||
        user?.postcode ||
        "",
      city: checkoutData[restaurantId].address_info.city || user?.city || "",
    },
  });

  function onSubmit(data: TCheckoutAddressInfoFormSchema) {
    setCheckoutData((prev) => ({
      ...prev,
      [restaurantId]: {
        ...prev[restaurantId],
        address_info: data,
      },
    }));
    setOpenAddressInfoDialog(false);
  }

  return (
    <Stack
      component="form"
      autoComplete="off"
      noValidate
      spacing={4}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack direction="row" spacing={2}>
        <Controller
          name="street_address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              autoComplete="off"
              label="Street address"
              error={!!errors.street_address}
              helperText={
                errors.street_address?.message && (
                  <FormHelperTextError
                    message={errors.street_address.message}
                  />
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
              required
              label="Building number"
              error={!!errors.building_number}
              helperText={
                errors.building_number?.message && (
                  <FormHelperTextError
                    message={errors.building_number.message}
                  />
                )
              }
              fullWidth
              sx={{ minWidth: 150 }}
            />
          )}
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <Controller
          name="postcode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
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
      </Stack>

      <Button
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
        loadingIndicator="Saving..."
        variant="contained"
      >
        Save
      </Button>
    </Stack>
  );
}
