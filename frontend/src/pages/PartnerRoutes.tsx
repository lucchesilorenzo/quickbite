import { Navigate, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import ParterRestaurantDashboardPage from "./private/partner/PartnerRestaurantDashboardPage";
import PartnerRestaurantMenuPage from "./private/partner/PartnerRestaurantMenuPage";
import PartnerRestaurantOffersPage from "./private/partner/PartnerRestaurantOffersPage";
import PartnerRestaurantOrdersPage from "./private/partner/PartnerRestaurantOrdersPage";
import PartnerRestaurantReviewsPage from "./private/partner/PartnerRestaurantReviewsPage";
import PartnerRestaurantSettingsFeesPage from "./private/partner/PartnerRestaurantSettingsFeesPage";
import PartnerRestaurantSettingsPage from "./private/partner/PartnerRestaurantSettingsPage";
import PartnerRestaurantStatsPage from "./private/partner/PartnerRestaurantStatsPage";

import PartnerRestaurantSettingsDeliveryTimesPage from "@/components/partner/restaurant/settings/delivery-times/PartnerRestaurantSettingsDeliveryTimesPage";
import PartnerLayout from "@/layouts/PartnerLayout";
import PartnerRestaurantLayout from "@/layouts/PartnerRestaurantLayout";
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
      <Route path="dashboard" element={<ParterRestaurantDashboardPage />} />

      <Route path="settings">
        <Route index element={<PartnerRestaurantSettingsPage />} />
        <Route path="fees" element={<PartnerRestaurantSettingsFeesPage />} />
        <Route
          path="delivery-times"
          element={<PartnerRestaurantSettingsDeliveryTimesPage />}
        />
      </Route>

      <Route path="menu" element={<PartnerRestaurantMenuPage />} />
      <Route path="orders" element={<PartnerRestaurantOrdersPage />} />
      <Route path="offers" element={<PartnerRestaurantOffersPage />} />
      <Route path="reviews" element={<PartnerRestaurantReviewsPage />} />
      <Route path="stats" element={<PartnerRestaurantStatsPage />} />
    </Route>
  </Route>,
];
