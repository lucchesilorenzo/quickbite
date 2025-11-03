import { Route } from "react-router-dom";

import BlockRoleRoute from "./BlockRoleRoute";
import AreaPage from "./public/AreaPage";
import HomePage from "./public/HomePage";
import HowDoILeaveAReviewPage from "./public/HowDoILeaveAReviewPage";
import HowWeRankPage from "./public/HowWeRankPage";
import PrivacyPolicyPage from "./public/PrivacyPolicyPage";
import RestaurantPage from "./public/RestaurantPage";
import TermsAndConditionsPage from "./public/TermsAndConditionsPage";
import BecomeARiderPage from "./public/rider/RiderRegisterPage";

import AppLayout from "@/layouts/public/AppLayout";
import AreaLayout from "@/layouts/public/AreaLayout";
import HomeLayout from "@/layouts/public/HomeLayout";
import RestaurantLayout from "@/layouts/public/RestaurantLayout";
import { Role } from "@/types/user-types";

const PUBLIC_BLOCKED_ROLES: Role[] = ["partner", "rider"];

export const PublicRoutes = [
  <Route path="/" element={<HomeLayout />}>
    <Route element={<BlockRoleRoute blockedRoles={PUBLIC_BLOCKED_ROLES} />}>
      <Route index element={<HomePage />} />
    </Route>
  </Route>,

  <Route path="/" element={<AppLayout />}>
    <Route element={<BlockRoleRoute blockedRoles={PUBLIC_BLOCKED_ROLES} />}>
      <Route path="become-a-rider" element={<BecomeARiderPage />} />
      <Route path="terms-and-conditions" element={<TermsAndConditionsPage />} />
      <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="how-we-rank" element={<HowWeRankPage />} />
      <Route
        path="how-do-i-leave-a-review"
        element={<HowDoILeaveAReviewPage />}
      />
    </Route>
  </Route>,

  <Route path="/" element={<AreaLayout />}>
    <Route
      path="area/:areaSlug"
      element={<BlockRoleRoute blockedRoles={PUBLIC_BLOCKED_ROLES} />}
    >
      <Route index element={<AreaPage />} />
    </Route>
  </Route>,

  <Route path="/" element={<RestaurantLayout />}>
    <Route
      path="restaurants/:restaurantSlug"
      element={<BlockRoleRoute blockedRoles={PUBLIC_BLOCKED_ROLES} />}
    >
      <Route index element={<RestaurantPage />} />
    </Route>
  </Route>,
];
