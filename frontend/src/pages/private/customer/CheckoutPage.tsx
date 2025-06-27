import { useEffect } from "react";

import DesktopCheckoutLayout from "@/components/customer/checkout/layouts/DesktopCheckoutLayout";
import MobileCheckoutLayout from "@/components/customer/checkout/layouts/MobileCheckoutLayout";
import CheckoutProvider from "@/contexts/CheckoutProvider";

export default function CheckoutPage() {
  useEffect(() => {
    document.title = "Checkout | QuickBite";
  }, []);

  return (
    <CheckoutProvider>
      <DesktopCheckoutLayout />
      <MobileCheckoutLayout />
    </CheckoutProvider>
  );
}
