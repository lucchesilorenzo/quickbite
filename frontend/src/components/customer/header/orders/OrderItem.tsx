import { useState } from "react";

import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import AddReviewDialog from "./AddReviewDialog";

import env from "@/lib/env";
import { formatCurrency } from "@/lib/utils";
import { Order } from "@/types/order-types";

type OrderItemProps = {
  order: Order;
};

export default function OrderItem({ order }: OrderItemProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [openAddReviewDialog, setOpenAddReviewDialog] = useState(false);

  const orderTotal = order.order_items.reduce(
    (acc, curr) => acc + curr.item_total,
    0,
  );

  return (
    <Paper variant="outlined" sx={{ p: 1 }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: "space-between" }}
      >
        <Stack direction="row" spacing={2}>
          <Box
            component="img"
            src={`${env.VITE_BASE_URL}${order.restaurant.logo}`}
            alt={order.restaurant.name}
            sx={{
              objectFit: "cover",
              width: 50,
              height: 50,
              border: "2px solid #fff",
              borderRadius: 2,
            }}
          />

          <Box>
            <Typography
              variant={isMobile ? "body1" : "h6"}
              sx={{ fontWeight: 700 }}
            >
              {order.restaurant.name}
            </Typography>

            <Typography variant="body2" color="textSecondary">
              {format(new Date(order.created_at), "d MMMM yyyy 'at' HH:mm")}
            </Typography>

            <Typography variant="body2" color="textSecondary" gutterBottom>
              {order.street_address} {order.building_number}, {order.postcode}{" "}
              {order.city}
            </Typography>

            <Typography variant="body1">
              {formatCurrency(orderTotal)}
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={1} sx={{ justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="info"
            onClick={() => setOpenAddReviewDialog(true)}
          >
            Leave a review
          </Button>

          <Button
            component={Link}
            to={`/restaurants/${order.restaurant.slug}`}
            variant="contained"
            color="primary"
          >
            Order again
          </Button>
        </Stack>
      </Stack>

      <AddReviewDialog
        openAddReviewDialog={openAddReviewDialog}
        setOpenAddReviewDialog={setOpenAddReviewDialog}
        restaurant={order.restaurant}
      />
    </Paper>
  );
}
