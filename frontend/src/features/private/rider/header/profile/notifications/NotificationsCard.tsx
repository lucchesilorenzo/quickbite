import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Card } from "@mui/material";

import NotificationsForm from "./NotificationsForm";

import CardHeading from "@/components/common/CardHeading/CardHeading";

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
