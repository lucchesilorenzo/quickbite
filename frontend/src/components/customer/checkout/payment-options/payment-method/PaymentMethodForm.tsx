import { zodResolver } from "@hookform/resolvers/zod";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { useCheckout } from "@/hooks/contexts/useCheckout";
import {
  TCheckoutPaymentMethodForm,
  checkoutPaymentMethodForm,
} from "@/validations/checkout-validations";

const paymentMethodOptions = [
  {
    startIcon: EuroOutlinedIcon,
    label: "Cash",
    value: "cash",
    endIcon: DoneOutlinedIcon,
  },
];

type PaymentMethodFormProps = {
  setOpenPaymentMethodDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PaymentMethodForm({
  setOpenPaymentMethodDialog,
}: PaymentMethodFormProps) {
  const { paymentMethod, setPaymentMethod } = useCheckout();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(checkoutPaymentMethodForm),
    defaultValues: {
      payment_method: paymentMethod?.payment_method ?? "",
    },
  });

  function onSubmit(data: TCheckoutPaymentMethodForm) {
    setPaymentMethod(data);
    setOpenPaymentMethodDialog(false);
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
        name="payment_method"
        control={control}
        render={({ field }) => (
          <Stack spacing={2}>
            {paymentMethodOptions.map((option) => (
              <Paper
                {...field}
                component={Button}
                key={option.value}
                variant="outlined"
                onClick={() => field.onChange(option.value)}
                sx={{
                  width: 1,
                  textTransform: "none",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&:hover": { bgcolor: grey[100] },
                  ...(field.value === option.value && {
                    border: `2px solid ${grey[500]}`,
                  }),
                  minHeight: 64,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <option.startIcon />
                  <Typography variant="h6">{option.label}</Typography>
                </Stack>

                {field.value === option.value && (
                  <option.endIcon color="primary" />
                )}
              </Paper>
            ))}

            {errors.payment_method?.message && (
              <FormHelperTextError message={errors.payment_method.message} />
            )}
          </Stack>
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
