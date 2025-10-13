import { useState } from "react";

import { useCheckout } from "@customer/contexts/CheckoutProvider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import AddressInfoDialog from "./AddressInfoDialog";

import { useAuth } from "@/contexts/AuthProvider";
import { formatAddress } from "@/lib/utils/formatting";

export default function AddressInfoItem() {
  const { user } = useAuth();
  const { checkoutData, restaurantId } = useCheckout();

  const [openAddressInfoDialog, setOpenAddressInfoDialog] = useState(false);

  const address =
    formatAddress(checkoutData[restaurantId].address_info) ||
    formatAddress(user) ||
    "Complete address is required";

  return (
    <>
      <ListItem disablePadding disableGutters>
        <ListItemButton
          sx={{ px: 3 }}
          onClick={() => setOpenAddressInfoDialog(true)}
        >
          <ListItemIcon>
            <FmdGoodOutlinedIcon color="primary" />
          </ListItemIcon>

          <ListItemText primary={address} />

          <ListItemIcon sx={{ justifyContent: "flex-end" }}>
            <ArrowForwardIosIcon color="inherit" />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>

      <AddressInfoDialog
        openAddressInfoDialog={openAddressInfoDialog}
        setOpenAddressInfoDialog={setOpenAddressInfoDialog}
      />
    </>
  );
}
