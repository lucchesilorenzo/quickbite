import { Box, useScrollTrigger } from "@mui/material";

import MenuCategoryNavigation from "../menu-category-navigation/MenuCategoryNavigation";
import MenuCategoryNavigationSearch from "../menu-category-navigation/MenuCategoryNavigationSearch";

import { useSingleRestaurant } from "@/hooks/contexts/public/useSingleRestaurant";

export default function MenuCategoryNavigationSectionMobile() {
  const { searchTerm } = useSingleRestaurant();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 800,
  });

  return (
    <Box
      sx={{
        display: { xs: "block", lg: "none" },
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
      <Box component="section" sx={{ px: 2 }}>
        <MenuCategoryNavigationSearch />
        {!searchTerm && <MenuCategoryNavigation />}
      </Box>
    </Box>
  );
}
