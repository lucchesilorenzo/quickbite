import { useEffect, useState } from "react";

import HistoryIcon from "@mui/icons-material/History";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Button, Container, Stack } from "@mui/material";
import { useRestaurant } from "@rider/contexts/RestaurantProvider";
import LeaveRestaurantDialog from "@rider/my-restaurant/LeaveRestaurantDialog";
import ActiveDeliveryContainer from "@rider/my-restaurant/delivery-history/ActiveDeliveryContainer";
import { Link } from "react-router-dom";

import HeadingBlock from "@/components/common/HeadingBlock";

export default function RiderMyRestaurantPage() {
  const { restaurantData } = useRestaurant();

  const [openLeaveRestaurantDialog, setOpenLeaveRestaurantDialog] =
    useState(false);

  useEffect(() => {
    document.title = "My restaurant | QuickBite";
  }, []);

  return (
    <>
      <Container component="main" maxWidth="md" sx={{ my: 3 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <HeadingBlock
            title={restaurantData?.restaurant?.name || "My restaurant"}
            description="View your active delivery"
          />

          <Button
            startIcon={<LogoutOutlinedIcon />}
            sx={{ textTransform: "none", mt: 1 }}
            color="error"
            onClick={() => setOpenLeaveRestaurantDialog(true)}
          >
            Leave restaurant
          </Button>
        </Stack>

        <Button
          component={Link}
          to="/rider/my-restaurant/deliveries/history"
          variant="contained"
          startIcon={<HistoryIcon />}
          sx={{ mb: 2 }}
        >
          History
        </Button>

        <ActiveDeliveryContainer />
      </Container>

      <LeaveRestaurantDialog
        openLeaveRestaurantDialog={openLeaveRestaurantDialog}
        setOpenLeaveRestaurantDialog={setOpenLeaveRestaurantDialog}
      />
    </>
  );
}
