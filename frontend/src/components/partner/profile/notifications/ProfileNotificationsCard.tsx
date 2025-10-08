import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Card } from "@mui/material";

import CardHeading from "../common/CardHeading";
import ProfileNotificationsForm from "./ProfileNotificationsForm";

export default function ProfileNotificationsCard() {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <CardHeading
        title="Notifications"
        description="Manage your notifications preferences"
        icon={NotificationsOutlinedIcon}
      />

      <ProfileNotificationsForm />
    </Card>
  );
}
