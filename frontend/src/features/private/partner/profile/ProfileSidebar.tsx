import { Box } from "@mui/material";

import HeadingBlock from "../restaurant/common/HeadingBlock";
import ProfileSidebarNavigation from "./ProfileSidebarNavigation";

export default function ProfileSidebar() {
  return (
    <Box>
      <HeadingBlock
        title="Profile settings"
        description="Update your profile information"
      />

      <ProfileSidebarNavigation />
    </Box>
  );
}
