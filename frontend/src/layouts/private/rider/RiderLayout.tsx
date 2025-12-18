import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "@/components/common/Footer";
import Header from "@/features/private/rider/header/Header";

export default function RiderLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />

      <Outlet />

      <Footer />
    </Stack>
  );
}
