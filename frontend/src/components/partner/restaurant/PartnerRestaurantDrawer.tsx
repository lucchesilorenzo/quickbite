import { useState } from "react";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Box, Drawer, IconButton, List } from "@mui/material";
import { useParams } from "react-router-dom";

import MobilePartnerRestaurantNavigationItem from "./mobile/MobilePartnerRestaurantNavigationItem";

import { partnerRestaurantRoutes } from "@/lib/data";

export default function PartnerRestaurantDrawer() {
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
            <MobilePartnerRestaurantNavigationItem
              route={route}
              setOpenDrawer={setOpenDrawer}
            />
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
