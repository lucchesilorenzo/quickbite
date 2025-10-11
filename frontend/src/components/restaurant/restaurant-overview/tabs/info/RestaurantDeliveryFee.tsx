import { useEffect, useRef } from "react";

import ReceiptIcon from "@mui/icons-material/Receipt";
import { Box, Card, Stack, Typography, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";

import { useRestaurant } from "@/hooks/contexts/public/useRestaurant";
import { formatCurrency } from "@/lib/utils/formatting";

export default function RestaurantDeliveryFee() {
  const { restaurant, scrollToDeliveryFee, setScrollToDeliveryFee } =
    useRestaurant();

  const deliveryFeeRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  useEffect(() => {
    if (scrollToDeliveryFee && deliveryFeeRef.current) {
      deliveryFeeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setScrollToDeliveryFee(false);
    }
  }, [scrollToDeliveryFee, deliveryFeeRef, setScrollToDeliveryFee]);

  return (
    <Box ref={deliveryFeeRef} sx={{ mb: 2 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
        <ReceiptIcon />

        <Typography
          variant={isMobile ? "body1" : "h6"}
          component="div"
          sx={{ fontWeight: 700 }}
        >
          Delivery fee
        </Typography>
      </Stack>

      <Card variant="outlined" sx={{ bgcolor: grey[100], p: 2 }}>
        {restaurant.min_amount && (
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography variant={isMobile ? "body2" : "body1"} component="div">
              Minimum order amount
            </Typography>

            <Typography variant={isMobile ? "body2" : "body1"}>
              {formatCurrency(restaurant.min_amount)}
            </Typography>
          </Stack>
        )}

        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant={isMobile ? "body2" : "body1"} component="div">
            Delivery fee
          </Typography>

          <Typography variant={isMobile ? "body2" : "body1"}>
            {restaurant.delivery_fee === 0
              ? "Free"
              : formatCurrency(restaurant.delivery_fee)}
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
}
