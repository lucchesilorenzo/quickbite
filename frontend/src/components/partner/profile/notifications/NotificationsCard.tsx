import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Card } from "@mui/material";

import CardHeading from "../common/CardHeading";
import NotificationsForm from "./NotificationsForm";

export default function NotificationsCard() {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <CardHeading
        title="Notifications"
        description="Manage your notifications preferences"
        icon={NotificationsOutlinedIcon}
      />

      <NotificationsForm />
    </Card>
  );
}
