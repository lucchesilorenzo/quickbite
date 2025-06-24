import { useEffect } from "react";

import DesktopCheckoutLayout from "@/components/customer/checkout/layouts/DesktopCheckoutLayout";

export default function CheckoutPage() {
  useEffect(() => {
    document.title = "Checkout | QuickBite";
  }, []);

  return <DesktopCheckoutLayout />;
}
