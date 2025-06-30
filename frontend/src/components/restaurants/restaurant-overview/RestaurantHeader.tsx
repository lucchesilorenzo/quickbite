import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";

import RestaurantAboutDialog from "./RestaurantAboutDialog";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function RestaurantHeader() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const {
    restaurant,
    openRestaurantAboutDialog,
    setOpenRestaurantAboutDialog,
    setTabToOpen,
  } = useSingleRestaurant();

  function handleOpenDialogAndSetTab() {
    setTabToOpen("info");
    setOpenRestaurantAboutDialog(true);
  }

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
        {restaurant.name}
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
