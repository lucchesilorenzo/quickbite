import { Stack } from "@mui/material";
import JobPostsProvider from "@rider/contexts/JobPostsProvider";
import NotificationsProvider from "@rider/contexts/NotificationsProvider";
import Header from "@rider/header/Header";
import { Outlet } from "react-router-dom";

export default function RiderLayout() {
  return (
    <NotificationsProvider>
      <JobPostsProvider>
        <Stack sx={{ minHeight: "100vh" }}>
          <Header />

          <Outlet />
        </Stack>
      </JobPostsProvider>
    </NotificationsProvider>
  );
}
