import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import RestaurantInfo from "../RestaurantInfo";
import MenuCategory from "../menu-categories/MenuCategory";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function MenuCategoriesListMobile() {
  const { restaurant } = useSingleRestaurant();

  return (
    <Box
      component="section"
      sx={{ display: { xs: "block", lg: "none" }, mt: 4 }}
    >
      {restaurant.menu_categories.map((menuCategory) => (
        <MenuCategory key={menuCategory.id} menuCategory={menuCategory} />
      ))}

      <Stack direction="row" spacing={0.5} sx={{ p: 2 }}>
        <InfoOutlineIcon fontSize="inherit" />

        <Typography component="div" variant="caption">
          Adults need around 2000 kcal (8400 kJ) a day.
        </Typography>
      </Stack>

      <RestaurantInfo />
    </Box>
  );
}
