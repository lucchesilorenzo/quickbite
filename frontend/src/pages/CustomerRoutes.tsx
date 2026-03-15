import { Route } from "react-router-dom";

import CheckoutPage from "./private/customer/CheckoutPage";
import CheckoutSuccessPage from "./private/customer/CheckoutSuccessPage";
import ProtectedRoute from "./private/guards/ProtectedRoute";

import CheckoutLayout from "@/layouts/private/customer/CheckoutLayout";

export const CustomerRoutes = [
  <Route path="/" element={<CheckoutLayout />}>
    <Route
      path="checkout/:cartId"
      element={<ProtectedRoute allowedRoles={["customer"]} />}
    >
      <Route index element={<CheckoutPage />} />
    </Route>
    ,
    <Route
      path="checkout/:orderId/success"
      element={<ProtectedRoute allowedRoles={["customer"]} />}
    >
      <Route index element={<CheckoutSuccessPage />} />
    </Route>
  </Route>,
];
