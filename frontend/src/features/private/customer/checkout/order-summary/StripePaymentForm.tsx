import { FormEvent, useState } from "react";

import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

type StripePaymentFormProps = {
  orderId: string;
  handleCardPaymentSuccess: () => void;
  handleCardPaymentDialogClose: () => void;
};

export default function StripePaymentForm({
  orderId,
  handleCardPaymentSuccess,
  handleCardPaymentDialogClose,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/${orderId}/success`,
      },
      redirect: "if_required",
    });

    setIsSubmitting(false);

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setErrorMessage(error.message ?? "Payment could not be completed.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }

      return;
    }

    handleCardPaymentSuccess();
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          Enter your card details. This step charges the amount shown in
          checkout.
        </Typography>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <PaymentElement />

        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: "flex-end", pt: 1 }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={handleCardPaymentDialogClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={!stripe || isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Pay now"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
