import { useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import AddressInfoDialog from "./AddressInfoDialog";

import { useAuth } from "@/hooks/contexts/useAuth";
import { useCheckout } from "@/hooks/contexts/useCheckout";

export default function AddressInfoItem() {
  const { user } = useAuth();
  const { checkoutData } = useCheckout();

  const [openAddressInfoDialog, setOpenAddressInfoDialog] = useState(false);

  const hasUserAddress =
    user?.street_address &&
    user?.building_number &&
    user?.postcode &&
    user?.city;

  const hasAddressInfo =
    checkoutData.address_info?.street_address &&
    checkoutData.address_info?.building_number &&
    checkoutData.address_info?.postcode &&
    checkoutData.address_info?.city;

  const text = hasAddressInfo
    ? `${checkoutData.address_info!.street_address} ${checkoutData.address_info!.building_number}, ${checkoutData.address_info!.postcode} ${checkoutData.address_info!.city}`
    : hasUserAddress
      ? `${user!.street_address} ${user!.building_number}, ${user!.postcode} ${user!.city}`
      : "Complete address is required";

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
          <ListItemText primary={text} />
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
