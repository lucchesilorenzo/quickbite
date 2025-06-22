import { Alert, Container, Typography } from "@mui/material";

import { formatCurrency } from "@/lib/utils";

type RestaurantCartMOVNotReachedAlertProps = {
  amountToReachMOV: number;
};

export default function RestaurantCartMOVNotReachedAlert({
  amountToReachMOV,
}: RestaurantCartMOVNotReachedAlertProps) {
  return (
    <Container maxWidth="md">
      <Alert severity="warning" sx={{ fontSize: 16 }}>
        Add{" "}
        <Typography variant="body2" component="span" sx={{ fontWeight: 700 }}>
          {formatCurrency(amountToReachMOV)}
        </Typography>{" "}
        to your order to request delivery
      </Alert>
    </Container>
  );
}
