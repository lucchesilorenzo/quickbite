import { useEffect } from "react";

import DesktopCheckoutLayout from "@/components/customer/checkout/layouts/DesktopCheckoutLayout";
import MobileCheckoutLayout from "@/components/customer/checkout/layouts/MobileCheckoutLayout";
import CustomerCheckoutProvider from "@/contexts/private/customer/CustomerCheckoutProvider";

export default function CustomerCheckoutPage() {
  useEffect(() => {
    document.title = "Checkout | QuickBite";
  }, []);

  return (
    <CustomerCheckoutProvider>
      <DesktopCheckoutLayout />
      <MobileCheckoutLayout />
    </CustomerCheckoutProvider>
  );
}
