import { useEffect } from "react";

import { Container } from "@mui/material";
import StaffTable from "@partner/restaurant/staff/StaffTable";

import HeadingBlock from "@/components/common/HeadingBlock";

export default function PartnerStaffPage() {
  useEffect(() => {
    document.title = "Staff | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <HeadingBlock title="Staff" description="Manage your staff" />
      <StaffTable />
    </Container>
  );
}
