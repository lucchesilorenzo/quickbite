import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavigateToTopFloatingButton from "@/components/common/NavigateToTopFloatingButton";

export default function AppLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />

      <Box component="main">
        <Outlet />
      </Box>

      <Footer />

      <NavigateToTopFloatingButton />
    </Stack>
  );
}
