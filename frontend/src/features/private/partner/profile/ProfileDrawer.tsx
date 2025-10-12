import { useState } from "react";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Box, Drawer, IconButton } from "@mui/material";

import HeadingBlock from "../restaurant/common/HeadingBlock";
import PartnerProfileSidebarNavigation from "./ProfileSidebarNavigation";

export default function ProfileDrawer() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Box>
      <IconButton onClick={() => setOpenDrawer(true)}>
        <MenuOutlinedIcon />
      </IconButton>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{ p: 2 }}>
          <HeadingBlock
            title="General information"
            description="Manage your general information of your profile"
          />
        </Box>

        <PartnerProfileSidebarNavigation setOpenDrawer={setOpenDrawer} />
      </Drawer>
    </Box>
  );
}
