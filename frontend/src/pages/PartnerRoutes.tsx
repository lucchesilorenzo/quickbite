import { Navigate, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PartnerDashboardPage from "./private/partner/dashboard/PartnerDashboardPage";
import PartnerMenuCategoriesPage from "./private/partner/menu/PartnerMenuCategoriesPage";
import PartnerMenuEditPage from "./private/partner/menu/PartnerMenuEditPage";
import PartnerMenuPage from "./private/partner/menu/PartnerMenuPage";
import PartnerNotificationsPage from "./private/partner/notifications/PartnerNotificationsPage";
import PartnerOffersPage from "./private/partner/offers/PartnerOffersPage";
import PartnerOrdersPage from "./private/partner/orders/PartnerOrdersPage";
import PartnerProfileGeneralPage from "./private/partner/profile/PartnerProfileGeneralPage";
import PartnerProfileNotificationsPage from "./private/partner/profile/PartnerProfileNotificationsPage";
import PartnerReviewsPage from "./private/partner/reviews/PartnerReviewsPage";
import PartnerSettingsDeliveryTimesEditPage from "./private/partner/settings/PartnerSettingsDeliveryTimesEditPage";
import PartnerSettingsDeliveryTimesPage from "./private/partner/settings/PartnerSettingsDeliveryTimesPage";
import PartnerSettingsFeesPage from "./private/partner/settings/PartnerSettingsFeesPage";
import PartnerSettingsInfoPage from "./private/partner/settings/PartnerSettingsInfoPage";
import PartnerSettingsPage from "./private/partner/settings/PartnerSettingsPage";
import PartnerStatsPage from "./private/partner/stats/PartnerStatsPage";

import PartnerLayout from "@/layouts/private/partner/PartnerLayout";
import PartnerProfileLayout from "@/layouts/private/partner/PartnerProfileLayout";
import PartnerRestaurantLayout from "@/layouts/private/partner/PartnerRestaurantLayout";
import PartnerRestaurantsPage from "@/pages/private/partner/PartnerRestaurantsPage";

export const PartnerRoutes = [
  <Route path="partner" element={<ProtectedRoute allowedRoles={["partner"]} />}>
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
      <Route path="dashboard" element={<PartnerDashboardPage />} />

      <Route path="settings">
        <Route index element={<PartnerSettingsPage />} />
        <Route path="fees" element={<PartnerSettingsFeesPage />} />
        <Route path="delivery-times">
          <Route index element={<PartnerSettingsDeliveryTimesPage />} />
          <Route
            path="edit"
            element={<PartnerSettingsDeliveryTimesEditPage />}
          />
        </Route>
        <Route path="info" element={<PartnerSettingsInfoPage />} />
      </Route>

      <Route path="menu">
        <Route index element={<PartnerMenuPage />} />
        <Route path="edit" element={<PartnerMenuEditPage />} />
        <Route path="categories" element={<PartnerMenuCategoriesPage />} />
      </Route>

      <Route path="orders" element={<PartnerOrdersPage />} />
      <Route path="offers" element={<PartnerOffersPage />} />
      <Route path="reviews" element={<PartnerReviewsPage />} />
      <Route path="stats" element={<PartnerStatsPage />} />

      <Route path="notifications" element={<PartnerNotificationsPage />} />
    </Route>
  </Route>,
];
