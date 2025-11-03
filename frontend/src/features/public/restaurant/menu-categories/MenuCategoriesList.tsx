import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { Box, Container, Stack, Typography } from "@mui/material";

import RestaurantInfo from "../RestaurantInfo";
import MenuCategoryItem from "./MenuCategoryItem";

import Spinner from "@/components/common/Spinner";
import { useMenu } from "@/contexts/MenuProvider";

export default function MenuCategoriesList() {
  const { menuData, isLoadingMenu } = useMenu();

  if (isLoadingMenu) return <Spinner />;

  return (
    <>
      <Box
        component="section"
        sx={{ display: { xs: "none", lg: "block" }, my: 4 }}
      >
        <Container maxWidth="md">
          {menuData.map((menuCategory) => (
            <MenuCategoryItem
              key={menuCategory.id}
              menuCategory={menuCategory}
            />
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

      <Box
        component="section"
        sx={{ display: { xs: "block", lg: "none" }, mt: 4 }}
      >
        {menuData.map((menuCategory) => (
          <MenuCategoryItem key={menuCategory.id} menuCategory={menuCategory} />
        ))}

        <Stack direction="row" spacing={0.5} sx={{ p: 2 }}>
          <InfoOutlineIcon fontSize="inherit" />

          <Typography component="div" variant="caption">
            Adults need around 2000 kcal (8400 kJ) a day.
          </Typography>
        </Stack>

        <RestaurantInfo />
      </Box>
    </>
  );
}
