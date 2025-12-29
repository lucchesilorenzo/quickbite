import { Stack } from "@mui/material";
import JobPostsProvider from "@rider/contexts/JobPostsProvider";
import Header from "@rider/header/Header";
import { Outlet } from "react-router-dom";

export default function RiderLayout() {
  return (
    <JobPostsProvider>
      <Stack sx={{ minHeight: "100vh" }}>
        <Header />

        <Outlet />
      </Stack>
    </JobPostsProvider>
  );
}
