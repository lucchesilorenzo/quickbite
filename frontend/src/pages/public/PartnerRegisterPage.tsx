import { useEffect } from "react";

import PartnerRegisterLayoutDesktop from "@/components/partner/auth/register/layouts/PartnerRegisterLayoutDesktop";
import PartnerRegisterLayoutMobile from "@/components/partner/auth/register/layouts/PartnerRegisterLayoutMobile";

export default function PartnerRegisterPage() {
  useEffect(() => {
    document.title = "Become a partner | QuickBite";
  }, []);

  return (
    <>
      <PartnerRegisterLayoutDesktop />
      <PartnerRegisterLayoutMobile />
    </>
  );
}
