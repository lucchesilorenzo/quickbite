import { useEffect } from "react";

import CustomerCheckoutLayoutDesktop from "@/components/customer/checkout/layouts/CustomerCheckoutLayoutDesktop";
import CustomerCheckoutLayoutMobile from "@/components/customer/checkout/layouts/CustomerCheckoutLayoutMobile";
import CustomerCheckoutProvider from "@/contexts/private/customer/CustomerCheckoutProvider";

export default function CustomerCheckoutPage() {
  useEffect(() => {
    document.title = "Checkout | QuickBite";
  }, []);

  return (
    <CustomerCheckoutProvider>
      <CustomerCheckoutLayoutDesktop />
      <CustomerCheckoutLayoutMobile />
    </CustomerCheckoutProvider>
  );
}
