import { useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DeliveryTimeDialog from "./DeliveryTimeDialog";

export default function DeliveryTimeItem() {
  const [openDeliveryTimeDialog, setOpenDeliveryTimeDialog] = useState(false);

  return (
    <>
      <ListItem disablePadding disableGutters>
        <ListItemButton
          sx={{ px: 3 }}
          onClick={() => setOpenDeliveryTimeDialog(true)}
        >
          <ListItemIcon>
            <WatchLaterOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Delivery time"
            secondary="As soon as possible"
          />
          <ListItemIcon sx={{ justifyContent: "flex-end" }}>
            <ArrowForwardIosIcon color="inherit" />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>

      <DeliveryTimeDialog
        openDeliveryTimeDialog={openDeliveryTimeDialog}
        setOpenDeliveryTimeDialog={setOpenDeliveryTimeDialog}
      />
    </>
  );
}
