import { Navigate, Route } from "react-router-dom";

import BlockRoleRoute from "./BlockRoleRoute";
import CustomerLoginPage from "./public/CustomerLoginPage";
import CustomerRegisterPage from "./public/CustomerRegisterPage";
import PartnerLoginPage from "./public/PartnerLoginPage";
import PartnerRegisterPage from "./public/PartnerRegisterPage";

import CustomerAuthLayout from "@/layouts/private/customer/CustomerAuthLayout";
import PartnerAuthLayout from "@/layouts/private/partner/PartnerAuthLayout";
import { Role } from "@/types";

const AUTH_BLOCKED_ROLES = [Role.CUSTOMER, Role.PARTNER, Role.RIDER];

export const AuthRoutes = [
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
];
