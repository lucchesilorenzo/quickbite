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

import { useCheckout } from "@/hooks/contexts/useCheckout";

export default function AddressInfoItem() {
  const { addressInfo } = useCheckout();

  const [openAddressInfoDialog, setOpenAddressInfoDialog] = useState(false);

  const text = addressInfo
    ? `${addressInfo.street_address} ${addressInfo.building_number}, ${addressInfo.postcode} ${addressInfo.city}`
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
