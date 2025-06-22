import { useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PaymentIcon from "@mui/icons-material/Payment";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import PaymentMethodDialog from "./PaymentMethodDialog";

export default function PaymentMethodItem() {
  const [openPaymentMethodDialog, setOpenPaymentMethodDialog] = useState(false);

  return (
    <>
      <ListItem disablePadding disableGutters>
        <ListItemButton
          sx={{ px: 3 }}
          onClick={() => setOpenPaymentMethodDialog(true)}
        >
          <ListItemIcon>
            <PaymentIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Choose a payment method"
            sx={{ "& .MuiListItemText-primary": { fontWeight: 500 } }}
          />
          <ListItemIcon sx={{ justifyContent: "flex-end" }}>
            <ArrowForwardIosIcon color="inherit" />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>

      <PaymentMethodDialog
        openPaymentMethodDialog={openPaymentMethodDialog}
        setOpenPaymentMethodDialog={setOpenPaymentMethodDialog}
      />
    </>
  );
}
