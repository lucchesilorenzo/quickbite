import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import AreaPage from "./AreaPage";
import BecomeAPartnerPage from "./BecomeAPartnerPage";
import BecomeARiderPage from "./BecomeARiderPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import RegisterPage from "./RegisterPage";
import TermsAndConditionsPage from "./TermsAndConditionsPage";

import CategoryFiltersProvider from "@/contexts/CategoryFiltersProvider";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <CategoryFiltersProvider>
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

            <Route path="area">
              <Route path=":areaSlug" element={<AreaPage />} />
            </Route>
          </Route>
        </Routes>
      </CategoryFiltersProvider>
    </BrowserRouter>
  );
}
