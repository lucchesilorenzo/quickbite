import { Box, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Outlet } from "react-router-dom";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function CustomerAuthLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />

      <Box
        sx={{
          bgcolor: grey[100],
          py: 6,
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
