import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "@/components/Footer";
import NavigateToTopFloatingButton from "@/components/NavigateToTopFloatingButton";
import HomeHeader from "@/features/public/homepage/HomeHeader";

export default function HomeLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <HomeHeader />

      <Outlet />

      <Footer />
      <NavigateToTopFloatingButton />
    </Stack>
  );
}
