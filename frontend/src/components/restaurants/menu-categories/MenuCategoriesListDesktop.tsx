import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { Container, Stack, Typography } from "@mui/material";

import MenuCategory from "./MenuCategory";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function MenuCategoriesListDesktop() {
  const { restaurant } = useSingleRestaurant();

  return (
    <Container
      component="section"
      maxWidth="md"
      sx={{ display: { xs: "none", lg: "block" }, my: 4 }}
    >
      {[...restaurant.menu_categories]
        .sort((a, b) => a.order - b.order)
        .map((menuCategory) => (
          <MenuCategory key={menuCategory.id} menuCategory={menuCategory} />
        ))}

      <Stack direction="row" spacing={0.5}>
        <InfoOutlineIcon fontSize="inherit" />

        <Typography component="div" variant="caption">
          Adults need around 2000 kcal (8400 kJ) a day.
        </Typography>
      </Stack>
    </Container>
  );
}
