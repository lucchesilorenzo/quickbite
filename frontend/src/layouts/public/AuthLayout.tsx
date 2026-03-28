import { Box, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import AuthHeader from "@public/auth/components/AuthHeader";
import { Outlet } from "react-router-dom";

import Footer from "@/components/common/Footer";

export default function AuthLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <AuthHeader />

      <Box
        sx={{
          bgcolor: grey[100],
          py: 6,
          px: 2,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Stack>
  );
}
