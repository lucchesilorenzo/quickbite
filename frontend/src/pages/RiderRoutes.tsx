import { Navigate, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import RiderJobPostsPage from "./private/rider/RiderJobPostsPage";

import RiderLayout from "@/layouts/private/rider/RiderLayout";

export const RiderRoutes = [
  <Route path="rider" element={<ProtectedRoute allowedRoles={["rider"]} />}>
    <Route element={<RiderLayout />}>
      <Route index element={<Navigate to="job-posts" replace />} />
      <Route path="job-posts" element={<RiderJobPostsPage />} />
    </Route>
  </Route>,
];
