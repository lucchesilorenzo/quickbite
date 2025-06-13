import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "@/components/common/Footer";
import SimpleHeader from "@/components/common/SimpleHeader";

export default function ErrorLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <SimpleHeader />

      <Outlet />

      <Footer />
    </Stack>
  );
}
