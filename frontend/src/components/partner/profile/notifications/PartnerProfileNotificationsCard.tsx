import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Card } from "@mui/material";

import PartnerCardHeading from "../common/PartnerCardHeading";
import PartnerProfileNotificationsForm from "./PartnerProfileNotificationsForm";

export default function PartnerProfileNotificationsCard() {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <PartnerCardHeading
        title="Notifications"
        description="Manage your notifications preferences"
        icon={NotificationsOutlinedIcon}
      />

      <PartnerProfileNotificationsForm />
    </Card>
  );
}
