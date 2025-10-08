import { useEffect } from "react";

import LoginLayoutDesktop from "@/components/partner/auth/login/layouts/LoginLayoutDesktop";
import LoginLayoutMobile from "@/components/partner/auth/login/layouts/LoginLayoutMobile";

export default function PartnerLoginPage() {
  useEffect(() => {
    document.title = "Partner login | QuickBite";
  }, []);

  return (
    <>
      <LoginLayoutDesktop />
      <LoginLayoutMobile />
    </>
  );
}
