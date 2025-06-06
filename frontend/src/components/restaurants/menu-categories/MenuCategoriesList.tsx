import { Container } from "@mui/material";

import MenuCategory from "./MenuCategory";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function MenuCategoriesList() {
  const { restaurant } = useSingleRestaurant();

  return (
    <Container component="section" maxWidth="md" sx={{ mt: 4 }}>
      {[...restaurant.menu_categories]
        .sort((a, b) => a.order - b.order)
        .map((menuCategory) => (
          <MenuCategory key={menuCategory.id} menuCategory={menuCategory} />
        ))}
    </Container>
  );
}
