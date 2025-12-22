import { Stack } from "@mui/material";
import JobPostsProvider from "@rider/contexts/JobPostsProvider";
import Header from "@rider/header/Header";
import { Outlet } from "react-router-dom";

import Footer from "@/components/common/Footer";

export default function RiderLayout() {
  return (
    <JobPostsProvider>
      <Stack sx={{ minHeight: "100vh" }}>
        <Header />

        <Outlet />

        <Footer />
      </Stack>
    </JobPostsProvider>
  );
}
