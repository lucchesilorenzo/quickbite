import { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { IconButton, Popover, Stack, Typography } from "@mui/material";

import { Delivery } from "../../types/deliveries/delivery.types";
import OrderItemsList from "./OrderItemsList";

type OrderItemsDetailsProps = {
  delivery: Delivery;
};

export default function OrderItemDetails({ delivery }: OrderItemsDetailsProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const isPlural = delivery.order.order_items.length > 1;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget);
  }

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <FastfoodIcon color="primary" fontSize="small" />

      <Typography component="div" variant="body2">
        {delivery.order.order_items.length} {isPlural ? "items" : "item"}
      </Typography>

      <IconButton
        color="inherit"
        aria-label="expand"
        size="small"
        onClick={handleClick}
        sx={{ p: 0 }}
      >
        <ExpandMoreIcon fontSize="small" />
      </IconButton>

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <OrderItemsList delivery={delivery} />
      </Popover>
    </Stack>
  );
}
