import { useEffect } from "react";

import { Box } from "@mui/material";

export default function PartnerLoginPage() {
  useEffect(() => {
    document.title = "Partner login | QuickBite";
  }, []);

  return <Box component="main">PartnerLoginPage</Box>;
}
