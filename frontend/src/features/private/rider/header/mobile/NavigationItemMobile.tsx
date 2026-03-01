import { SvgIconComponent } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link, useLocation } from "react-router-dom";

import { riderRoutes } from "../../lib/data/navigation.data";

type NavigationItemMobileProps = {
  route: {
    href: (typeof riderRoutes)[number]["href"];
    label: (typeof riderRoutes)[number]["label"];
    icon: SvgIconComponent;
  };
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavigationItemMobile({
  route,
  setOpenDrawer,
}: NavigationItemMobileProps) {
  const { pathname } = useLocation();

  return (
    <ListItem disableGutters>
      <ListItemButton
        component={Link}
        to={route.href}
        selected={pathname === route.href}
        onClick={() => setOpenDrawer(false)}
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
  );
}
