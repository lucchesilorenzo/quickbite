import { useState } from "react";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Box, Drawer, IconButton, List, Skeleton, Stack } from "@mui/material";

import { useRestaurant } from "../contexts/RestaurantProvider";
import { riderRoutes } from "../lib/constants/navigation";
import NavigationItemMobile from "./mobile/NavigationItemMobile";

export default function HeaderDrawer() {
  const { restaurantData, isLoadingRestaurant } = useRestaurant();

  const [openDrawer, setOpenDrawer] = useState(false);

  const visibleRoutes = riderRoutes.filter(
    ({ href }) =>
      href !== "/rider/my-restaurant" ||
      restaurantData?.restaurant?.pivot.is_active,
  );

  return (
    <Box>
      <IconButton onClick={() => setOpenDrawer(true)}>
        <MenuOutlinedIcon />
      </IconButton>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List dense sx={{ width: 200 }}>
          {isLoadingRestaurant ? (
            <Stack aria-busy="true" aria-label="Loading tabs" spacing={2}>
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  animation="wave"
                  height={40}
                />
              ))}
            </Stack>
          ) : (
            visibleRoutes.map((route) => (
              <NavigationItemMobile
                key={route.href}
                route={route}
                setOpenDrawer={setOpenDrawer}
              />
            ))
          )}
        </List>
      </Drawer>
    </Box>
  );
}
