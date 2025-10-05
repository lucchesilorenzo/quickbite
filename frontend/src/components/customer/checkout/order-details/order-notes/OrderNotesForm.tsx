import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { useCustomerCheckout } from "@/hooks/contexts/private/customer/useCustomerCheckout";
import {
  TCheckoutOrderNotesFormSchema,
  checkoutOrderNotesFormSchema,
} from "@/validations/checkout-validations";

type OrderNotesFormProps = {
  setOpenOrderNotesDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OrderNotesForm({
  setOpenOrderNotesDialog,
}: OrderNotesFormProps) {
  const { checkoutData, restaurantId, setCheckoutData } = useCustomerCheckout();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(checkoutOrderNotesFormSchema),
    defaultValues: {
      notes: checkoutData[restaurantId].notes || "",
    },
  });

  function onSubmit(data: TCheckoutOrderNotesFormSchema) {
    setCheckoutData((prev) => ({
      ...prev,
      [restaurantId]: {
        ...prev[restaurantId],
        ...data,
      },
    }));
    setOpenOrderNotesDialog(false);
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
        name="notes"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            multiline
            autoComplete="off"
            label="Add a note (optional)"
            placeholder={
              'For example: "Very spicy, please" or "Leave the order on the porch".'
            }
            maxRows={4}
            error={!!errors.notes}
            helperText={
              errors.notes?.message && (
                <FormHelperTextError message={errors.notes.message} />
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
        loadingIndicator="Saving..."
        variant="contained"
      >
        Save
      </Button>
    </Stack>
  );
}
