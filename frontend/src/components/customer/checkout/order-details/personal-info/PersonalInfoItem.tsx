import { useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import PersonalInfoDialog from "./PersonalInfoDialog";

import { useCustomerCheckout } from "@/hooks/contexts/private/customer/useCustomerCheckout";
import { useAuth } from "@/hooks/contexts/public/useAuth";

export default function PersonalInfoItem() {
  const { user } = useAuth();
  const { checkoutData, restaurantId } = useCustomerCheckout();

  const [openPersonalInfoDialog, setOpenPersonalInfoDialog] = useState(false);

  const text = `${checkoutData[restaurantId].personal_info?.first_name || user?.first_name} ${checkoutData[restaurantId].personal_info?.last_name || user?.last_name}`;
  const phoneNumber =
    checkoutData[restaurantId].personal_info?.phone_number ||
    user?.phone_number ||
    "";

  return (
    <>
      <ListItem disablePadding disableGutters>
        <ListItemButton
          sx={{ px: 3 }}
          onClick={() => setOpenPersonalInfoDialog(true)}
        >
          <ListItemIcon>
            <PersonOutlineOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary={text} secondary={phoneNumber} />
          <ListItemIcon sx={{ justifyContent: "flex-end" }}>
            <ArrowForwardIosIcon color="inherit" />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>

      <PersonalInfoDialog
        openPersonalInfoDialog={openPersonalInfoDialog}
        setOpenPersonalInfoDialog={setOpenPersonalInfoDialog}
      />
    </>
  );
}
