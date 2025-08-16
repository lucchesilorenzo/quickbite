import { useState } from "react";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import {
  Box,
  Button,
  Card,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { format } from "date-fns";

import PartnerOrdersItemViewOrderDialog from "./PartnerOrdersItemViewOrderDialog";
import UpdateOrderStatusButton from "./UpdateOrderStatusButton";

import OrderStatusBadge from "@/components/common/OrderStatusBadge";
import { formatCurrency } from "@/lib/utils";
import { Order } from "@/types/order-types";

type PartnerOrdersItemProps = {
  order: Order;
};

export default function PartnerOrdersItem({ order }: PartnerOrdersItemProps) {
  const [openViewOrderDialog, setOpenViewOrderDialog] = useState(false);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Card variant="outlined" sx={{ p: 1 }}>
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={2}
        sx={{ justifyContent: "space-between" }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <RestaurantIcon color="primary" />

          <Box sx={{ flex: 1 }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", mb: 1 }}
            >
              <Typography
                variant={isMobile ? "body1" : "h6"}
                sx={{ fontWeight: 700 }}
              >
                Order # {order.order_code}
              </Typography>

              <OrderStatusBadge order={order} />
            </Stack>

            <Stack spacing={0.5} sx={{ mb: 1 }}>
              <Typography variant="body2">
                {order.first_name} {order.last_name}
              </Typography>

              <Typography variant="body2">
                {format(new Date(order.created_at), "d MMMM yyyy 'at' HH:mm")}
              </Typography>

              <Typography variant="body2" gutterBottom>
                {order.street_address} {order.building_number}, {order.postcode}{" "}
                {order.city}
              </Typography>
            </Stack>

            <Typography variant="body1">
              {formatCurrency(order.total)}
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={2}>
          <Button
            aria-label={`View details for order ${order.order_code}`}
            variant="contained"
            color="success"
            onClick={() => setOpenViewOrderDialog(true)}
            fullWidth
          >
            View order
          </Button>

          <UpdateOrderStatusButton order={order} />
          <Stack />
        </Stack>

        <PartnerOrdersItemViewOrderDialog
          order={order}
          openViewOrderDialog={openViewOrderDialog}
          setOpenViewOrderDialog={setOpenViewOrderDialog}
        />
      </Stack>
    </Card>
  );
}
