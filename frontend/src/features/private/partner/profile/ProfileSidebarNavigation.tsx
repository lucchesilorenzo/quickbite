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

const profileRoutes = [
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

type ProfileSidebarNavigationProps = {
  setOpenDrawer?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProfileSidebarNavigation({
  setOpenDrawer,
}: ProfileSidebarNavigationProps) {
  const { pathname } = useLocation();

  return (
    <List dense disablePadding>
      {profileRoutes.map((route) => (
        <ListItem key={route.href} disableGutters>
          <ListItemButton
            component={Link}
            to={route.href}
            selected={pathname === route.href}
            onClick={() => setOpenDrawer?.(false)}
            sx={{
              "&.Mui-selected": { bgcolor: grey[200] },
              "&.Mui-selected:hover": { bgcolor: grey[200] },
            }}
          >
            <ListItemIcon>
              <route.icon />
            </ListItemIcon>

            <ListItemText primary={route.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
