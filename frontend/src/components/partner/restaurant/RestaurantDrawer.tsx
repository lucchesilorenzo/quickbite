import { useState } from "react";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Box, Drawer, IconButton, List } from "@mui/material";
import { useParams } from "react-router-dom";

import RestaurantNavigationItemMobile from "./mobile/RestaurantNavigationItemMobile";

import { partnerRestaurantRoutes } from "@/lib/constants/navigation";

export default function RestaurantDrawer() {
  const { restaurantId } = useParams();

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Box>
      <IconButton onClick={() => setOpenDrawer(true)}>
        <MenuOutlinedIcon />
      </IconButton>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List dense sx={{ width: 200 }}>
          {partnerRestaurantRoutes(restaurantId).map((route) => (
            <RestaurantNavigationItemMobile
              key={route.href}
              route={route}
              setOpenDrawer={setOpenDrawer}
            />
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
