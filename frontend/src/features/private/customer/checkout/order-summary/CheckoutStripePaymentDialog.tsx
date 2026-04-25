import { useMemo } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";

import StripePaymentForm from "./StripePaymentForm";

import { getStripe } from "@/lib/stripe/load-stripe";

type CheckoutStripePaymentDialogProps = {
  open: boolean;
  clientSecret: string;
  orderId: string;
  handleCardPaymentSuccess: () => void;
  handleCardPaymentDialogClose: () => void;
};

/**
 * Collects card details with Stripe Payment Element, then confirms the PaymentIntent.
 * If 3D Secure redirects, the user returns to `/checkout/:orderId/success` (return_url).
 */
export default function CheckoutStripePaymentDialog({
  open,
  clientSecret,
  orderId,
  handleCardPaymentSuccess,
  handleCardPaymentDialogClose,
}: CheckoutStripePaymentDialogProps) {
  const stripe = useMemo(() => getStripe(), []);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={open}
      onClose={handleCardPaymentDialogClose}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Payment</DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={handleCardPaymentDialogClose}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 1 }}>
          <Elements
            stripe={stripe}
            options={{
              clientSecret,
              appearance: { theme: "stripe" },
            }}
          >
            <StripePaymentForm
              orderId={orderId}
              handleCardPaymentSuccess={handleCardPaymentSuccess}
              handleCardPaymentDialogClose={handleCardPaymentDialogClose}
            />
          </Elements>
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
