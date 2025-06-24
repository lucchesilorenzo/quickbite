import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import RedirectIfAuthenticated from "./RedirectIfAuthenticated";
import CheckoutPage from "./private/customer/CheckoutPage";
import CheckoutSuccessPage from "./private/customer/CheckoutSuccessPage";
import AreaPage from "./public/AreaPage";
import BecomeAPartnerPage from "./public/BecomeAPartnerPage";
import BecomeARiderPage from "./public/BecomeARiderPage";
import CustomerLoginPage from "./public/CustomerLoginPage";
import CustomerRegisterPage from "./public/CustomerRegisterPage";
import ErrorPage from "./public/ErrorPage";
import HomePage from "./public/HomePage";
import PrivacyPolicyPage from "./public/PrivacyPolicyPage";
import RestaurantPage from "./public/RestaurantPage";
import TermsAndConditionsPage from "./public/TermsAndConditionsPage";

import AuthProvider from "@/contexts/AuthProvider";
import CategoryFiltersProvider from "@/contexts/CategoryFiltersProvider";
import MultiCartProvider from "@/contexts/MultiCartProvider";
import RestaurantProvider from "@/contexts/RestaurantProvider";
import AreaLayout from "@/layouts/AreaLayout";
import CheckoutLayout from "@/layouts/CheckoutLayout";
import CustomerAuthLayout from "@/layouts/CustomerAuthLayout";
import ErrorLayout from "@/layouts/ErrorLayout";
import HomeLayout from "@/layouts/HomeLayout";
import RestaurantLayout from "@/layouts/RestaurantLayout";
import { Role } from "@/types";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MultiCartProvider>
          <CategoryFiltersProvider>
            <RestaurantProvider>
              <Routes>
                <Route path="/" element={<HomeLayout />}>
                  <Route index element={<HomePage />} />
                </Route>

                <Route path="/" element={<CustomerAuthLayout />}>
                  <Route
                    path="customer/auth"
                    element={<RedirectIfAuthenticated />}
                  >
                    <Route index element={<Navigate to="login" />} />
                    <Route path="register" element={<CustomerRegisterPage />} />
                    <Route path="login" element={<CustomerLoginPage />} />
                  </Route>
                </Route>

                <Route path="/" element={<AppLayout />}>
                  <Route path="become-a-rider" element={<BecomeARiderPage />} />
                  <Route
                    path="become-a-partner"
                    element={<BecomeAPartnerPage />}
                  />
                  <Route
                    path="terms-and-conditions"
                    element={<TermsAndConditionsPage />}
                  />
                  <Route
                    path="privacy-policy"
                    element={<PrivacyPolicyPage />}
                  />
                </Route>

                <Route path="/" element={<AreaLayout />}>
                  <Route path="area/:areaSlug">
                    <Route index element={<AreaPage />} />
                  </Route>
                </Route>

                <Route path="/" element={<RestaurantLayout />}>
                  <Route path="restaurants/:restaurantSlug">
                    <Route index element={<RestaurantPage />} />
                  </Route>
                </Route>

                <Route path="/" element={<CheckoutLayout />}>
                  <Route
                    path="checkout/:cartId"
                    element={<ProtectedRoute allowedRoles={[Role.CUSTOMER]} />}
                  >
                    <Route index element={<CheckoutPage />} />
                  </Route>
                  <Route
                    path="checkout/:orderId/success"
                    element={<ProtectedRoute allowedRoles={[Role.CUSTOMER]} />}
                  >
                    <Route index element={<CheckoutSuccessPage />} />
                  </Route>
                </Route>

                <Route path="/" element={<ErrorLayout />}>
                  <Route path="*" element={<ErrorPage />} />
                </Route>
              </Routes>
            </RestaurantProvider>
          </CategoryFiltersProvider>
        </MultiCartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
