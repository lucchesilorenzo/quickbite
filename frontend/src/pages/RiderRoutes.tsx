import { Navigate, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import RiderJobPostApplicationPage from "./private/rider/RiderJobPostApplicationPage";
import RiderJobPostsPage from "./private/rider/RiderJobPostsPage";
import RiderProfileGeneralPage from "./private/rider/RiderProfileGeneralPage";
import RiderProfileNotificationsPage from "./private/rider/RiderProfileNotificationsPage";

import RiderLayout from "@/layouts/private/rider/RiderLayout";
import RiderProfileLayout from "@/layouts/private/rider/RiderProfileLayout";

export const RiderRoutes = [
  <Route path="rider" element={<ProtectedRoute allowedRoles={["rider"]} />}>
    <Route element={<RiderLayout />}>
      <Route index element={<Navigate to="job-posts" replace />} />
      <Route path="job-posts" element={<RiderJobPostsPage />} />
      <Route
        path="job-posts/:jobPostId/apply"
        element={<RiderJobPostApplicationPage />}
      />
    </Route>

    <Route element={<RiderProfileLayout />}>
      <Route path="profile">
        <Route index element={<Navigate to="general" replace />} />
        <Route path="general" element={<RiderProfileGeneralPage />} />
        <Route
          path="notifications"
          element={<RiderProfileNotificationsPage />}
        />
      </Route>
    </Route>
  </Route>,
];
