import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Card } from "@mui/material";

import PartnerCardHeading from "../common/PartnerCardHeading";
import PartnerProfileGeneralPersonalInfoForm from "./PartnerProfileGeneralPersonalInfoForm";

export default function PartnerProfileGeneralPersonalInfoCard() {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <PartnerCardHeading
        title="Personal information"
        description="Your profile information and contact details"
        icon={AccountCircleOutlinedIcon}
      />

      <PartnerProfileGeneralPersonalInfoForm />
    </Card>
  );
}
