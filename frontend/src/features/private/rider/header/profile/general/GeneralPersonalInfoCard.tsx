import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Card } from "@mui/material";

import GeneralPersonalInfoForm from "./GeneralPersonalInfoForm";

import CardHeading from "@/components/common/CardHeading/CardHeading";

export default function GeneralPersonalInfoCard() {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <CardHeading
        title="Personal information"
        description="Your profile information and contact details"
        icon={AccountCircleOutlinedIcon}
      />

      <GeneralPersonalInfoForm />
    </Card>
  );
}
