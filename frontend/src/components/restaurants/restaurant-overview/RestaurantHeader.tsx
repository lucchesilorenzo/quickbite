import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { IconButton, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import { RestaurantDetail } from "@/types";

type RestaurantHeaderProps = {
  restaurant: RestaurantDetail;
};

export default function RestaurantHeader({
  restaurant,
}: RestaurantHeaderProps) {
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}
    >
      <Typography component="h1" variant="h4" sx={{ fontWeight: "700" }}>
        {restaurant.name}
      </Typography>

      <IconButton
        color="inherit"
        sx={{ bgcolor: grey[100], "&:hover": { bgcolor: grey[200] } }}
        onClick={() => {}}
      >
        <InfoOutlineIcon />
      </IconButton>
    </Stack>
  );
}
