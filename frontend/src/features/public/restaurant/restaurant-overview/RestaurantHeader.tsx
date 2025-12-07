import { useEffect } from "react";

import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSearchParams } from "react-router-dom";

import RestaurantAboutDialog from "./RestaurantAboutDialog";

import { useRestaurant } from "@/contexts/RestaurantProvider";
import { restaurantTabs } from "@/lib/constants/restaurants";
import { RestaurantTab } from "@/types/restaurants/restaurant.types";

export default function RestaurantHeader() {
  const {
    restaurantData,
    openRestaurantAboutDialog,
    setOpenRestaurantAboutDialog,
    setTabToOpen,
  } = useRestaurant();

  const [searchParams, setSearchParams] = useSearchParams();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  function handleOpenDialogAndSetTab() {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      tab: "info",
    });
    setTabToOpen("info");
    setOpenRestaurantAboutDialog(true);
  }

  useEffect(() => {
    const tab = searchParams.get("tab") as RestaurantTab;

    if (tab && restaurantTabs.includes(tab)) {
      setOpenRestaurantAboutDialog(true);
    }
  }, [searchParams, setOpenRestaurantAboutDialog]);

  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}
    >
      <Typography
        component="h1"
        variant={isMobile ? "h5" : "h4"}
        sx={{ fontWeight: 700 }}
      >
        {restaurantData.restaurant.name}
      </Typography>

      <IconButton
        color="inherit"
        sx={{ bgcolor: grey[100], "&:hover": { bgcolor: grey[200] } }}
        onClick={handleOpenDialogAndSetTab}
        size={isMobile ? "small" : "medium"}
      >
        <InfoOutlineIcon fontSize={isMobile ? "small" : "medium"} />
      </IconButton>

      <RestaurantAboutDialog
        openRestaurantAboutDialog={openRestaurantAboutDialog}
        setOpenRestaurantAboutDialog={setOpenRestaurantAboutDialog}
      />
    </Stack>
  );
}
