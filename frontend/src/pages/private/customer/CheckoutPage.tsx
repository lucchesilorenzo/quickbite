import { useEffect } from "react";

import CheckoutLayoutDesktop from "@/features/private/customer/checkout/layouts/CheckoutLayoutDesktop";
import CheckoutLayoutMobile from "@/features/private/customer/checkout/layouts/CheckoutLayoutMobile";
import CustomerCheckoutProvider from "@/features/private/customer/contexts/CheckoutProvider";

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
