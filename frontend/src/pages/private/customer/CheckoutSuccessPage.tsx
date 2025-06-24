import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useGetOrder } from "@/hooks/react-query/private/orders/useGetOrder";

export default function CheckoutSuccessPage() {
  const { orderId } = useParams();
  const {
    data: order,
    isLoading: isOrderLoading,
    error: orderError,
  } = useGetOrder(orderId);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  if (isOrderLoading) return <FullPageSpinner />;

  if (orderError) {
    return (
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <ReportGmailerrorredIcon fontSize="large" color="error" />

        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="p"
          sx={{ textAlign: "center" }}
        >
          {orderError?.message || "Something went wrong."}
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack
      spacing={4}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Stack spacing={1} sx={{ alignItems: "center" }}>
        <CheckCircleOutlineIcon fontSize="large" color="success" />

        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="p"
          sx={{ textAlign: "center" }}
        >
          Your order{" "}
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="span"
            sx={{ fontWeight: 700 }}
          >
            # {order?.order_code}
          </Typography>{" "}
          has been placed successfully!
        </Typography>
      </Stack>

      <Button variant="contained" component={Link} to="/">
        Back to home page
      </Button>
    </Stack>
  );
}
