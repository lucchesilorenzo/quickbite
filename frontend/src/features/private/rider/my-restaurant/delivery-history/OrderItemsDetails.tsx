import { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { IconButton, Popover, Stack, Typography } from "@mui/material";

import OrderItemsList from "./OrderItemsList";

import { DeliveryResource } from "@/api/models";

type OrderItemsDetailsProps = {
  delivery: DeliveryResource;
};

export default function OrderItemDetails({ delivery }: OrderItemsDetailsProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const orderItems = delivery.order?.order_items ?? [];
  const isPlural = orderItems.length > 1;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget);
  }

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <FastfoodIcon color="primary" fontSize="small" />

      <Typography component="div" variant="body2">
        {orderItems.length} {isPlural ? "items" : "item"}
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
