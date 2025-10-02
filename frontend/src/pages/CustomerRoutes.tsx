import { Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import CustomerCheckoutPage from "./private/customer/CustomerCheckoutPage";
import CustomerCheckoutSuccessPage from "./private/customer/CustomerCheckoutSuccessPage";

import CheckoutLayout from "@/layouts/CheckoutLayout";
import { Role } from "@/types";

export const CustomerRoutes = [
  <Route path="/" element={<CheckoutLayout />}>
    <Route
      path="checkout/:cartId"
      element={<ProtectedRoute allowedRoles={[Role.CUSTOMER]} />}
    >
      <Route index element={<CustomerCheckoutPage />} />
    </Route>
    ,
    <Route
      path="checkout/:orderId/success"
      element={<ProtectedRoute allowedRoles={[Role.CUSTOMER]} />}
    >
      <Route index element={<CustomerCheckoutSuccessPage />} />
    </Route>
  </Route>,
];
