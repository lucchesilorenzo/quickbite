import { Navigate, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import ParterRestaurantDashboardPage from "./private/partner/dashboard/PartnerRestaurantDashboardPage";
import PartnerRestaurantMenuCategoriesPage from "./private/partner/menu/PartnerRestaurantMenuCategoriesPage";
import PartnerRestaurantMenuEditPage from "./private/partner/menu/PartnerRestaurantMenuEditPage";
import PartnerRestaurantMenuPage from "./private/partner/menu/PartnerRestaurantMenuPage";
import PartnerRestaurantNotificationsPage from "./private/partner/notifications/PartnerRestaurantNotificationsPage";
import PartnerRestaurantOffersPage from "./private/partner/offers/PartnerRestaurantOffersPage";
import PartnerRestaurantOrdersPage from "./private/partner/orders/PartnerRestaurantOrdersPage";
import PartnerProfileGeneralPage from "./private/partner/profile/PartnerProfileGeneralPage";
import PartnerProfileNotificationsPage from "./private/partner/profile/PartnerProfileNotificationsPage";
import PartnerRestaurantReviewsPage from "./private/partner/reviews/PartnerRestaurantReviewsPage";
import PartnerRestaurantSettingsDeliveryTimesEditPage from "./private/partner/settings/PartnerRestaurantSettingsDeliveryTimesEditPage";
import PartnerRestaurantSettingsFeesPage from "./private/partner/settings/PartnerRestaurantSettingsFeesPage";
import PartnerRestaurantSettingsInfoPage from "./private/partner/settings/PartnerRestaurantSettingsInfoPage";
import PartnerRestaurantSettingsPage from "./private/partner/settings/PartnerRestaurantSettingsPage";
import PartnerRestaurantStatsPage from "./private/partner/stats/PartnerRestaurantStatsPage";

import PartnerLayout from "@/layouts/private/partner/PartnerLayout";
import PartnerProfileLayout from "@/layouts/private/partner/PartnerProfileLayout";
import PartnerRestaurantLayout from "@/layouts/private/partner/PartnerRestaurantLayout";
import PartnerRestaurantsPage from "@/pages/private/partner/PartnerRestaurantsPage";
import PartnerRestaurantSettingsDeliveryTimesPage from "@/pages/private/partner/settings/PartnerRestaurantSettingsDeliveryTimesPage";
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
        <Route
          path="notifications"
          element={<PartnerProfileNotificationsPage />}
        />
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
