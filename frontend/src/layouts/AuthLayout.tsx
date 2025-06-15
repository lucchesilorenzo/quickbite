import { Box, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Outlet } from "react-router-dom";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

export default function AuthLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />

      <Box sx={{ bgcolor: grey[200] }}>
        <Outlet />
      </Box>

      <Footer />
    </Stack>
  );
}
