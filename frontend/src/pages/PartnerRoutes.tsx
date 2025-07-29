import { Navigate, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PartnerDashboardPage from "./private/partner/PartnerDashboardPage";
import PartnerRestaurantsPage from "./private/partner/PartnerRestaurantsPage";

import PartnerLayout from "@/layouts/PartnerLayout";
import { Role } from "@/types";

export const PartnerRoutes = [
  <Route path="/" element={<PartnerLayout />}>
    <Route
      path="partner"
      element={<ProtectedRoute allowedRoles={[Role.PARTNER]} />}
    >
      <Route index element={<Navigate to="restaurants" />} />
      <Route path="restaurants" element={<PartnerRestaurantsPage />} />
      <Route path="dashboard" element={<PartnerDashboardPage />} />
    </Route>
  </Route>,
];
