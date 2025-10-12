import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavigateToTopFloatingButton from "@/components/NavigateToTopFloatingButton";

export default function AppLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />

      <Outlet />

      <Footer />
      <NavigateToTopFloatingButton />
    </Stack>
  );
}
