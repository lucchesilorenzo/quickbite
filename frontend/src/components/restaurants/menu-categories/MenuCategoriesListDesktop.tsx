import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { Box, Container, Stack, Typography } from "@mui/material";

import RestaurantInfo from "../RestaurantInfo";
import MenuCategory from "./MenuCategory";

import Spinner from "@/components/common/Spinner";
import { useMenu } from "@/hooks/contexts/public/useMenu";

export default function MenuCategoriesListDesktop() {
  const { menuData, isLoadingMenu } = useMenu();

  if (isLoadingMenu) return <Spinner />;

  return (
    <Box
      component="section"
      sx={{ display: { xs: "none", lg: "block" }, my: 4 }}
    >
      <Container maxWidth="md">
        {menuData.map((menuCategory) => (
          <MenuCategory key={menuCategory.id} menuCategory={menuCategory} />
        ))}
        <Stack direction="row" spacing={0.5}>
          <InfoOutlineIcon fontSize="inherit" />

          <Typography component="div" variant="caption">
            Adults need around 2000 kcal (8400 kJ) a day.
          </Typography>
        </Stack>
      </Container>

      <RestaurantInfo />
    </Box>
  );
}
