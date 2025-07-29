import { Navigate, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import PartnerLayout from "@/layouts/PartnerLayout";
import PartnerRestaurantLayout from "@/layouts/PartnerRestaurantLayout";
import PartnerDashboardPage from "@/pages/private/partner/PartnerDashboardPage";
import PartnerRestaurantsPage from "@/pages/private/partner/PartnerRestaurantsPage";
import { Role } from "@/types";

export const PartnerRoutes = [
  <Route
    path="partner"
    element={<ProtectedRoute allowedRoles={[Role.PARTNER]} />}
  >
    <Route element={<PartnerLayout />}>
      <Route index element={<Navigate to="restaurants" replace />} />
      <Route path="restaurants" element={<PartnerRestaurantsPage />} />
    </Route>

    <Route
      path="restaurants/:restaurantId"
      element={<PartnerRestaurantLayout />}
    >
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<PartnerDashboardPage />} />
    </Route>
  </Route>,
];
