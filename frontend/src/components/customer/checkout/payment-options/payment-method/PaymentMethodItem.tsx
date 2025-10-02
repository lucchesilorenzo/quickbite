import { useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PaymentIcon from "@mui/icons-material/Payment";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { yellow } from "@mui/material/colors";

import PaymentMethodDialog from "./PaymentMethodDialog";

import { useCustomerCheckout } from "@/hooks/contexts/private/customer/useCustomerCheckout";

export default function PaymentMethodItem() {
  const { checkoutData, restaurantId } = useCustomerCheckout();

  const [openPaymentMethodDialog, setOpenPaymentMethodDialog] = useState(false);

  return (
    <>
      <ListItem disablePadding disableGutters>
        <ListItemButton
          sx={{
            px: 3,
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
          }}
          onClick={() => setOpenPaymentMethodDialog(true)}
        >
          <Stack direction="row" sx={{ width: 1, alignItems: "center" }}>
            <ListItemIcon>
              <PaymentIcon color="primary" />
            </ListItemIcon>

            <ListItemText
              primary="Choose a payment method"
              sx={{
                "& .MuiListItemText-primary": { fontWeight: 500 },
              }}
            />

            <ListItemIcon sx={{ justifyContent: "flex-end" }}>
              <ArrowForwardIosIcon color="inherit" />
            </ListItemIcon>
          </Stack>

          {checkoutData[restaurantId].payment_method?.payment_method ===
            "cash" && (
            <Box sx={{ bgcolor: yellow[100], p: 2, borderRadius: 3, my: 1 }}>
              <Typography variant="body1">
                You will pay the exact amount in cash to the delivery person. If
                you want to pay with large denomination notes, please indicate
                it clearly so that the rider can bring the necessary change.
              </Typography>
            </Box>
          )}
        </ListItemButton>
      </ListItem>

      <PaymentMethodDialog
        openPaymentMethodDialog={openPaymentMethodDialog}
        setOpenPaymentMethodDialog={setOpenPaymentMethodDialog}
      />
    </>
  );
}
