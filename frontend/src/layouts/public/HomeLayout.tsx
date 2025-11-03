import { Stack } from "@mui/material";
import HomeHeader from "@public/homepage/HomeHeader";
import { Outlet } from "react-router-dom";

import Footer from "@/components/common/Footer";
import NavigateToTopFloatingButton from "@/components/common/NavigateToTopFloatingButton";

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
