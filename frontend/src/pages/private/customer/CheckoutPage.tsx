import { useEffect } from "react";

import CheckoutLayoutDesktop from "@customer/checkout/layouts/CheckoutLayoutDesktop";
import CheckoutLayoutMobile from "@customer/checkout/layouts/CheckoutLayoutMobile";
import CustomerCheckoutProvider from "@customer/contexts/CheckoutProvider";

export default function CheckoutPage() {
  useEffect(() => {
    document.title = "Checkout | QuickBite";
  }, []);

  return (
    <CustomerCheckoutProvider>
      <CheckoutLayoutDesktop />
      <CheckoutLayoutMobile />
    </CustomerCheckoutProvider>
  );
}
