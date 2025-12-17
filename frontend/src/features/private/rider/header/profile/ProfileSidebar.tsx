import { Box } from "@mui/material";

import ProfileSidebarNavigation from "./ProfileSidebarNavigation";

import HeadingBlock from "@/components/common/HeadingBlock";

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
