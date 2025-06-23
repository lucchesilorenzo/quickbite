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

import { useAuth } from "@/hooks/contexts/useAuth";
import { useCheckout } from "@/hooks/contexts/useCheckout";

export default function PersonalInfoItem() {
  const { user } = useAuth();
  const { checkoutData } = useCheckout();

  const [openPersonalInfoDialog, setOpenPersonalInfoDialog] = useState(false);

  const text = `${checkoutData.personal_info?.first_name || user?.first_name} ${checkoutData.personal_info?.last_name || user?.last_name}`;
  const phoneNumber =
    checkoutData.personal_info?.phone_number || user?.phone_number || "";

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
