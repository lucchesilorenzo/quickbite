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
import { useLocation, useNavigate } from "react-router-dom";

import AddReviewDialog from "./AddReviewDialog";
import ViewOrderDialog from "./ViewOrderDialog";

import { useAuth } from "@/hooks/contexts/useAuth";
import env from "@/lib/env";
import { formatCurrency } from "@/lib/utils";
import { Order } from "@/types/order-types";

type OrderItemProps = {
  order: Order;
};

export default function OrderItem({ order }: OrderItemProps) {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [openViewOrderDialog, setOpenViewOrderDialog] = useState(false);
  const [openAddReviewDialog, setOpenAddReviewDialog] = useState(false);

  const hasCustomerReviewed = order.restaurant.reviews.some(
    (review) => review.user_id === user?.id && review.order_id === order.id,
  );

  const isOnRestaurantPage =
    pathname === `/restaurants/${order.restaurant.slug}`;

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
              {formatCurrency(order.total)}
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={1} sx={{ justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenViewOrderDialog(true)}
          >
            View order
          </Button>

          <Button
            variant="contained"
            color="info"
            onClick={() => setOpenAddReviewDialog(true)}
            disabled={hasCustomerReviewed}
          >
            Leave a review
          </Button>

          <Button
            onClick={() => {
              if (isOnRestaurantPage) {
                navigate(0);
              } else {
                navigate(`/restaurants/${order.restaurant.slug}`);
              }
            }}
            variant="contained"
            color="primary"
          >
            Order again
          </Button>
        </Stack>
      </Stack>

      <ViewOrderDialog
        openViewOrderDialog={openViewOrderDialog}
        setOpenViewOrderDialog={setOpenViewOrderDialog}
        order={order}
      />

      <AddReviewDialog
        openAddReviewDialog={openAddReviewDialog}
        setOpenAddReviewDialog={setOpenAddReviewDialog}
        order={order}
      />
    </Paper>
  );
}
