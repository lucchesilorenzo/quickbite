import { useEffect } from "react";

import PartnerLoginLayoutDesktop from "@/components/partner/auth/login/layouts/PartnerLoginLayoutDesktop";
import PartnerLoginLayoutMobile from "@/components/partner/auth/login/layouts/PartnerLoginLayoutMobile";

export default function PartnerLoginPage() {
  useEffect(() => {
    document.title = "Partner login | QuickBite";
  }, []);

  return (
    <>
      <PartnerLoginLayoutDesktop />
      <PartnerLoginLayoutMobile />
    </>
  );
}
