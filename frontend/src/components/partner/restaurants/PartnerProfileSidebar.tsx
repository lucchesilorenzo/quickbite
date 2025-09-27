import { Box } from "@mui/material";

import PartnerHeadingBlock from "../restaurant/common/PartnerHeadingBlock";
import PartnerProfileSidebarNavigation from "./PartnerProfileSidebarNavigation";

export default function PartnerProfileSidebar() {
  return (
    <Box>
      <PartnerHeadingBlock
        title="Profile settings"
        description="Update your profile information"
        backButton
      />

      <PartnerProfileSidebarNavigation />
    </Box>
  );
}
