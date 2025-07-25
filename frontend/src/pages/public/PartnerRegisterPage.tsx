import { useEffect } from "react";

import DesktopPartnerRegisterLayout from "@/components/partner/auth/register/layouts/DesktopPartnerRegisterLayout";

export default function PartnerRegisterPage() {
  useEffect(() => {
    document.title = "Become a partner | QuickBite";
  }, []);

  return <DesktopPartnerRegisterLayout />;
}
