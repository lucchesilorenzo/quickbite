import { useEffect } from "react";

import RegisterLayoutDesktop from "@/components/partner/auth/register/layouts/RegisterLayoutDesktop";
import RegisterLayoutMobile from "@/components/partner/auth/register/layouts/RegisterLayoutMobile";

export default function PartnerRegisterPage() {
  useEffect(() => {
    document.title = "Become a partner | QuickBite";
  }, []);

  return (
    <>
      <RegisterLayoutDesktop />
      <RegisterLayoutMobile />
    </>
  );
}
