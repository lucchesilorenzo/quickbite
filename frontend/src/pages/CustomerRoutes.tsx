import { Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import CheckoutPage from "./private/customer/CheckoutPage";
import CheckoutSuccessPage from "./private/customer/CheckoutSuccessPage";

import CheckoutLayout from "@/layouts/private/customer/CheckoutLayout";
import { Role } from "@/types";

export const CustomerRoutes = [
  <Route path="/" element={<CheckoutLayout />}>
    <Route
      path="checkout/:cartId"
      element={<ProtectedRoute allowedRoles={[Role.CUSTOMER]} />}
    >
      <Route index element={<CheckoutPage />} />
    </Route>
    ,
    <Route
      path="checkout/:orderId/success"
      element={<ProtectedRoute allowedRoles={[Role.CUSTOMER]} />}
    >
      <Route index element={<CheckoutSuccessPage />} />
    </Route>
  </Route>,
];
