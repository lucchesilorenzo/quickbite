import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import AreaPage from "./AreaPage";
import BecomeAPartnerPage from "./BecomeAPartnerPage";
import BecomeARiderPage from "./BecomeARiderPage";
import ErrorPage from "./ErrorPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import RegisterPage from "./RegisterPage";
import RestaurantPage from "./RestaurantPage";
import TermsAndConditionsPage from "./TermsAndConditionsPage";

import CategoryFiltersProvider from "@/contexts/CategoryFiltersProvider";
import RestaurantProvider from "@/contexts/RestaurantProvider";
import AreaLayout from "@/layouts/AreaLayout";
import ErrorLayout from "@/layouts/ErrorLayout";
import RestaurantLayout from "@/layouts/RestaurantLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <CategoryFiltersProvider>
        <RestaurantProvider>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route path="auth">
                <Route index element={<Navigate to="login" />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
              </Route>

              <Route index element={<HomePage />} />
              <Route path="become-a-rider" element={<BecomeARiderPage />} />
              <Route path="become-a-partner" element={<BecomeAPartnerPage />} />
              <Route
                path="terms-and-conditions"
                element={<TermsAndConditionsPage />}
              />
              <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            </Route>

            <Route path="/" element={<RestaurantLayout />}>
              <Route path="restaurants/:restaurantSlug">
                <Route index element={<RestaurantPage />} />
              </Route>
            </Route>

            <Route path="/" element={<AreaLayout />}>
              <Route path="area/:areaSlug">
                <Route index element={<AreaPage />} />
              </Route>
            </Route>

            <Route path="/" element={<ErrorLayout />}>
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </RestaurantProvider>
      </CategoryFiltersProvider>
    </BrowserRouter>
  );
}
