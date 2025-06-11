import { Box, Container, useScrollTrigger } from "@mui/material";

import MenuCategoryNavigation from "../menu-category-navigation/MenuCategoryNavigation";
import MenuCategoryNavigationSearch from "../menu-category-navigation/MenuCategoryNavigationSearch";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function MenuCategoryNavigationSectionDesktop() {
  const { searchTerm } = useSingleRestaurant();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 600,
  });

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "block" },
        ...(trigger && {
          position: "sticky",
          top: 0,
          zIndex: 1000,
          bgcolor: "#fff",
          boxShadow: 3,
          p: 1,
        }),
      }}
    >
      <Container component="section" maxWidth="md">
        <MenuCategoryNavigationSearch />
        {!searchTerm && <MenuCategoryNavigation />}
      </Container>
    </Box>
  );
}
