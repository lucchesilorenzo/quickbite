import { useEffect } from "react";

import CheckoutLayoutDesktop from "@/components/customer/checkout/layouts/CheckoutLayoutDesktop";
import CheckoutLayoutMobile from "@/components/customer/checkout/layouts/CheckoutLayoutMobile";
import CustomerCheckoutProvider from "@/contexts/private/customer/CheckoutProvider";

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
