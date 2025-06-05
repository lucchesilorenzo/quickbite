import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { IconButton, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import RestaurantAboutDialog from "./RestaurantAboutDialog";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function RestaurantHeader() {
  const {
    restaurant,
    openRestaurantAboutDialog,
    setOpenRestaurantAboutDialog,
  } = useSingleRestaurant();

  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}
    >
      <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
        {restaurant.name}
      </Typography>

      <IconButton
        color="inherit"
        sx={{ bgcolor: grey[100], "&:hover": { bgcolor: grey[200] } }}
        onClick={() => setOpenRestaurantAboutDialog(true)}
      >
        <InfoOutlineIcon />
      </IconButton>

      <RestaurantAboutDialog
        openRestaurantAboutDialog={openRestaurantAboutDialog}
        setOpenRestaurantAboutDialog={setOpenRestaurantAboutDialog}
      />
    </Stack>
  );
}
