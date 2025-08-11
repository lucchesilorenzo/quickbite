import { Box, Stack, Typography } from "@mui/material";

import PartnerMenuCategoriesItem from "./PartnerMenuCategoriesItem";

import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";

export default function PartnerMenuCategoriesList() {
  const { restaurant } = usePartnerRestaurant();

  if (!restaurant.menu_categories.length) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Start adding your menu categories here.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
        {restaurant.menu_categories.map((menuCategory) => (
          <PartnerMenuCategoriesItem
            key={menuCategory.id}
            menuCategory={menuCategory}
          />
        ))}
      </Stack>
    </Box>
  );
}
