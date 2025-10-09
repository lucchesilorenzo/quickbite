import { Box, useScrollTrigger } from "@mui/material";

import MenuCategoryNavigation from "../MenuCategoryNavigation";
import MenuCategoryNavigationSearch from "../MenuCategoryNavigationSearch";

import { useRestaurant } from "@/hooks/contexts/public/useRestaurant";

export default function MenuCategoryNavigationSectionMobile() {
  const { searchTerm } = useRestaurant();

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
