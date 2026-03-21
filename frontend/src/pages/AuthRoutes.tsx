import { Navigate, Route } from "react-router-dom";

import BlockRoleRoute from "./private/guards/BlockRoleRoute";
import ResetPasswordPage from "./public/auth/ResetPasswordPage";
import CustomerLoginPage from "./public/auth/customer/CustomerLoginPage";
import CustomerRegisterPage from "./public/auth/customer/CustomerRegisterPage";
import PartnerLoginPage from "./public/auth/partner/PartnerLoginPage";
import PartnerRegisterPage from "./public/auth/partner/PartnerRegisterPage";
import RiderLoginPage from "./public/auth/rider/RiderLoginPage";
import RiderRegisterPage from "./public/auth/rider/RiderRegisterPage";

import CustomerAuthLayout from "@/layouts/private/customer/CustomerAuthLayout";
import PartnerAuthLayout from "@/layouts/private/partner/PartnerAuthLayout";
import RiderAuthLayout from "@/layouts/private/rider/RiderAuthLayout";
import AuthLayout from "@/layouts/public/AuthLayout";
import { Role } from "@/types/user.types";

const AUTH_BLOCKED_ROLES: Role[] = ["customer", "partner", "rider"];

export const AuthRoutes = [
  <Route path="/" element={<AuthLayout />}>
    <Route element={<BlockRoleRoute blockedRoles={AUTH_BLOCKED_ROLES} />}>
      <Route path="auth/reset-password" element={<ResetPasswordPage />} />
    </Route>
  </Route>,

  <Route path="/" element={<CustomerAuthLayout />}>
    <Route
      path="customer/auth"
      element={<BlockRoleRoute blockedRoles={AUTH_BLOCKED_ROLES} />}
    >
      <Route index element={<Navigate to="login" />} />
      <Route path="register" element={<CustomerRegisterPage />} />
      <Route path="login" element={<CustomerLoginPage />} />
    </Route>
  </Route>,

  <Route path="/" element={<PartnerAuthLayout />}>
    <Route
      path="partner/auth"
      element={<BlockRoleRoute blockedRoles={AUTH_BLOCKED_ROLES} />}
    >
      <Route index element={<Navigate to="login" />} />
      <Route path="register" element={<PartnerRegisterPage />} />
      <Route path="login" element={<PartnerLoginPage />} />
    </Route>
  </Route>,

  <Route path="/" element={<RiderAuthLayout />}>
    <Route
      path="rider/auth"
      element={<BlockRoleRoute blockedRoles={AUTH_BLOCKED_ROLES} />}
    >
      <Route index element={<Navigate to="login" />} />
      <Route path="register" element={<RiderRegisterPage />} />
      <Route path="login" element={<RiderLoginPage />} />
    </Route>
  </Route>,
];
