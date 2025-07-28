import { useEffect } from "react";

import DesktopPartnerLoginLayout from "@/components/partner/auth/login/layouts/DesktopPartnerLoginLayout";
import MobilePartnerLoginLayout from "@/components/partner/auth/login/layouts/MobilePartnerLoginLayout";

export default function PartnerLoginPage() {
  useEffect(() => {
    document.title = "Partner login | QuickBite";
  }, []);

  return (
    <>
      <DesktopPartnerLoginLayout />
      <MobilePartnerLoginLayout />
    </>
  );
}
