import { Box, Container, useScrollTrigger } from "@mui/material";

import MenuCategoryNavigation from "./MenuCategoryNavigation";
import MenuCategoryNavigationSearch from "./MenuCategoryNavigationSearch";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function MenuCategoryNavigationSection() {
  const { searchTerm } = useSingleRestaurant();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 600,
  });

  return (
    <Box
      sx={{
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
