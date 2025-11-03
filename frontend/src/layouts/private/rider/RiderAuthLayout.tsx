import { Stack } from "@mui/material";
import AuthHeader from "@rider/auth/AuthHeader";
import { Outlet } from "react-router-dom";

import Footer from "@/components/common/Footer";

export default function RiderAuthLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <AuthHeader />

      <Outlet />

      <Footer />
    </Stack>
  );
}
