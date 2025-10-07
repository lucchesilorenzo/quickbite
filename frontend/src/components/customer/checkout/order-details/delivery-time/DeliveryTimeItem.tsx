import { useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

import DeliveryTimeDialog from "./DeliveryTimeDialog";

import { useCustomerCheckout } from "@/hooks/contexts/private/customer/useCustomerCheckout";

export default function DeliveryTimeItem() {
  const { checkoutData, restaurantId, setFetchDeliverySlots } =
    useCustomerCheckout();

  const [openDeliveryTimeDialog, setOpenDeliveryTimeDialog] = useState(false);

  const queryClient = useQueryClient();
  const deliveryTime = checkoutData[restaurantId].delivery_time;

  const secondaryText =
    deliveryTime.type === "asap"
      ? "As soon as possible"
      : deliveryTime.type === "schedule"
        ? `Today, ${deliveryTime.value && format(new Date(deliveryTime.value), "HH:mm")}`
        : "Select delivery time";

  async function handleOpenDeliveryTimeDialog() {
    setFetchDeliverySlots(true);
    setOpenDeliveryTimeDialog(true);

    queryClient.invalidateQueries({ queryKey: ["delivery-slots"] });
  }

  return (
    <>
      <ListItem disablePadding disableGutters>
        <ListItemButton sx={{ px: 3 }} onClick={handleOpenDeliveryTimeDialog}>
          <ListItemIcon>
            <WatchLaterOutlinedIcon color="primary" />
          </ListItemIcon>

          <ListItemText primary="Delivery time" secondary={secondaryText} />

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
