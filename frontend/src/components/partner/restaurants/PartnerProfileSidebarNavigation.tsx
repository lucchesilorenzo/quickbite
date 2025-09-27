import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link, useLocation } from "react-router-dom";

const partnerProfileRoutes = [
  {
    href: "/partner/profile/general",
    label: "General information",
    icon: AccountCircleOutlinedIcon,
  },
  {
    href: "/partner/profile/notifications",
    label: "Notifications",
    icon: NotificationsOutlinedIcon,
  },
];

export default function PartnerProfileSidebarNavigation() {
  const { pathname } = useLocation();

  return (
    <List dense disablePadding>
      {partnerProfileRoutes.map((route) => (
        <ListItem key={route.href} disableGutters>
          <ListItemButton
            component={Link}
            to={route.href}
            selected={pathname === route.href}
            sx={{
              "&.Mui-selected": { bgcolor: grey[200] },
              "&.Mui-selected:hover": { bgcolor: grey[200] },
            }}
          >
            <ListItemIcon>
              <route.icon fontSize="small" />
            </ListItemIcon>

            <ListItemText primary={route.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
