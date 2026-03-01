import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Box, Card, Stack, Typography, useMediaQuery } from "@mui/material";
import { format } from "date-fns";

import { Delivery } from "../types/deliveries/delivery.types";
import OrderItemsDetails from "./OrderItemsDetails";
import SplitButton from "./SplitButton";

import OrderStatusBadge from "@/components/common/OrderStatusBadge";

type DeliveryItemProps = {
  delivery: Delivery;
};

export default function DeliveryItem({ delivery }: DeliveryItemProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

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
                Order # {delivery.order.order_code}
              </Typography>

              <OrderStatusBadge orderStatus={delivery.order.status} />
            </Stack>

            <Stack spacing={0.5} sx={{ mb: 1 }}>
              <Typography variant="body2">
                Customer: {delivery.order.first_name} {delivery.order.last_name}
              </Typography>

              <Typography variant="body2">
                {format(
                  new Date(delivery.order.created_at),
                  "d MMMM yyyy 'at' HH:mm",
                )}
              </Typography>

              <Typography variant="body2" gutterBottom>
                {delivery.order.street_address} {delivery.order.building_number}
                , {delivery.order.postcode} {delivery.order.city},{" "}
                {delivery.order.state}
              </Typography>

              <OrderItemsDetails delivery={delivery} />
            </Stack>
          </Box>
        </Stack>

        <SplitButton delivery={delivery} />
      </Stack>
    </Card>
  );
}
