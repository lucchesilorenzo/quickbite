import { useEffect } from "react";

import DesktopCheckoutLayout from "@/components/customer/checkout/layouts/DesktopCheckoutLayout";
import MobileCheckoutLayout from "@/components/customer/checkout/layouts/MobileCheckoutLayout";

export default function CheckoutPage() {
  useEffect(() => {
    document.title = "Checkout | QuickBite";
  }, []);

  return (
    <>
      <DesktopCheckoutLayout />
      <MobileCheckoutLayout />
    </>
  );
}
