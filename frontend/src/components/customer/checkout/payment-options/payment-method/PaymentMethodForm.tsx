import { zodResolver } from "@hookform/resolvers/zod";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { useCustomerCheckout } from "@/hooks/contexts/private/customer/useCustomerCheckout";
import {
  TCheckoutPaymentMethodFormSchema,
  checkoutPaymentMethodFormSchema,
} from "@/validations/checkout-validations";

const paymentMethodOptions = [
  {
    startIcon: EuroOutlinedIcon,
    label: "Cash",
    value: "cash",
    text: "You will pay the exact amount in cash to the delivery person. If you want to pay with large denomination banknotes, please indicate it clearly in the order notes so that the rider can bring the necessary change.",
    endIcon: DoneOutlinedIcon,
  },
];

type PaymentMethodFormProps = {
  setOpenPaymentMethodDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PaymentMethodForm({
  setOpenPaymentMethodDialog,
}: PaymentMethodFormProps) {
  const { checkoutData, restaurantId, setCheckoutData } = useCustomerCheckout();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(checkoutPaymentMethodFormSchema),
    defaultValues: {
      payment_method: checkoutData[restaurantId].payment_method || "",
    },
  });

  function onSubmit(data: TCheckoutPaymentMethodFormSchema) {
    setCheckoutData((prev) => ({
      ...prev,
      [restaurantId]: {
        ...prev[restaurantId],
        ...data,
      },
    }));
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
              <Box key={option.value}>
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
                    border:
                      field.value === option.value
                        ? `2px solid ${grey[500]}`
                        : "",
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

                {field.value === option.value && (
                  <Typography sx={{ mt: 1 }}>{option.text}</Typography>
                )}
              </Box>
            ))}

            {errors.payment_method?.message && (
              <FormHelperTextError message={errors.payment_method.message} />
            )}
          </Stack>
        )}
      />

      <Divider />

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
