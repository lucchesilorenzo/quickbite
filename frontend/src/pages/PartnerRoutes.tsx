import { Navigate, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import ParterRestaurantDashboardPage from "./private/partner/PartnerRestaurantDashboardPage";
import PartnerRestaurantMenuCategoriesPage from "./private/partner/PartnerRestaurantMenuCategoriesPage";
import PartnerRestaurantMenuEditPage from "./private/partner/PartnerRestaurantMenuEditPage";
import PartnerRestaurantMenuPage from "./private/partner/PartnerRestaurantMenuPage";
import PartnerRestaurantNotificationsPage from "./private/partner/PartnerRestaurantNotificationsPage";
import PartnerRestaurantOffersPage from "./private/partner/PartnerRestaurantOffersPage";
import PartnerRestaurantOrdersPage from "./private/partner/PartnerRestaurantOrdersPage";
import PartnerRestaurantReviewsPage from "./private/partner/PartnerRestaurantReviewsPage";
import PartnerRestaurantSettingsDeliveryTimesEditPage from "./private/partner/PartnerRestaurantSettingsDeliveryTimesEditPage";
import PartnerRestaurantSettingsFeesPage from "./private/partner/PartnerRestaurantSettingsFeesPage";
import PartnerRestaurantSettingsInfoPage from "./private/partner/PartnerRestaurantSettingsInfoPage";
import PartnerRestaurantSettingsPage from "./private/partner/PartnerRestaurantSettingsPage";
import PartnerRestaurantStatsPage from "./private/partner/PartnerRestaurantStatsPage";
import PartnerProfileGeneralPage from "./private/partner/profile/PartnerProfileGeneralPage";

import PartnerLayout from "@/layouts/PartnerLayout";
import PartnerProfileLayout from "@/layouts/PartnerProfileLayout";
import PartnerRestaurantLayout from "@/layouts/PartnerRestaurantLayout";
import PartnerRestaurantSettingsDeliveryTimesPage from "@/pages/private/partner/PartnerRestaurantSettingsDeliveryTimesPage";
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

    <Route element={<PartnerProfileLayout />}>
      <Route path="profile">
        <Route index element={<Navigate to="general" replace />} />
        <Route path="general" element={<PartnerProfileGeneralPage />} />
      </Route>
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
        <Route path="delivery-times">
          <Route
            index
            element={<PartnerRestaurantSettingsDeliveryTimesPage />}
          />
          <Route
            path="edit"
            element={<PartnerRestaurantSettingsDeliveryTimesEditPage />}
          />
        </Route>
        <Route path="info" element={<PartnerRestaurantSettingsInfoPage />} />
      </Route>

      <Route path="menu">
        <Route index element={<PartnerRestaurantMenuPage />} />
        <Route path="edit" element={<PartnerRestaurantMenuEditPage />} />
        <Route
          path="categories"
          element={<PartnerRestaurantMenuCategoriesPage />}
        />
      </Route>

      <Route path="orders" element={<PartnerRestaurantOrdersPage />} />
      <Route path="offers" element={<PartnerRestaurantOffersPage />} />
      <Route path="reviews" element={<PartnerRestaurantReviewsPage />} />
      <Route path="stats" element={<PartnerRestaurantStatsPage />} />

      <Route
        path="notifications"
        element={<PartnerRestaurantNotificationsPage />}
      />
    </Route>
  </Route>,
];
