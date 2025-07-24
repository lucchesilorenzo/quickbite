import { useEffect } from "react";

import { Box } from "@mui/material";

export default function PartnerRegisterPage() {
  useEffect(() => {
    document.title = "Become a partner | QuickBite";
  }, []);

  return <Box component="main">PartnerRegisterPage</Box>;
}
