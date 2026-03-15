import { Navigate, Route } from "react-router-dom";

import ProtectedRoute from "./private/guards/ProtectedRoute";
import RiderHasRestaurant from "./private/guards/RiderHasRestaurant";
import RiderDeliveriesHistoryPage from "./private/rider/RiderDeliveriesHistoryPage";
import RiderJobApplicationPage from "./private/rider/RiderJobApplicationPage";
import RiderJobPostsPage from "./private/rider/RiderJobPostsPage";
import RiderMyRestaurantPage from "./private/rider/RiderMyRestaurantPage";
import RiderNotificationsPage from "./private/rider/RiderNotificationsPage";
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
        element={<RiderJobApplicationPage />}
      />
      <Route path="my-restaurant" element={<RiderHasRestaurant />}>
        <Route index element={<RiderMyRestaurantPage />} />
        <Route
          path="deliveries/history"
          element={<RiderDeliveriesHistoryPage />}
        />
      </Route>
      <Route path="notifications" element={<RiderNotificationsPage />} />
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
