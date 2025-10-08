import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Card } from "@mui/material";

import CardHeading from "../common/CardHeading";
import ProfileGeneralPersonalInfoForm from "./ProfileGeneralPersonalInfoForm";

export default function ProfileGeneralPersonalInfoCard() {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <CardHeading
        title="Personal information"
        description="Your profile information and contact details"
        icon={AccountCircleOutlinedIcon}
      />

      <ProfileGeneralPersonalInfoForm />
    </Card>
  );
}
