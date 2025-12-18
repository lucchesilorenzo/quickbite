import { useState } from "react";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Box, Drawer, IconButton, List } from "@mui/material";

import { riderUnemployedRoutes } from "../lib/constants/navigation";
import NavigationItemMobile from "./mobile/NavigationItemMobile";

export default function HeaderDrawer() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Box>
      <IconButton onClick={() => setOpenDrawer(true)}>
        <MenuOutlinedIcon />
      </IconButton>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List dense sx={{ width: 200 }}>
          {riderUnemployedRoutes.map((route) => (
            <NavigationItemMobile
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
