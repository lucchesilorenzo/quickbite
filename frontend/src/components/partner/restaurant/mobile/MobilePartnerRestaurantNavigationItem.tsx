import { SvgIconComponent } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link, useLocation } from "react-router-dom";

type MobilePartnerRestaurantNavigationItemProps = {
  route: {
    href: string;
    label: string;
    icon: SvgIconComponent;
  };
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobilePartnerRestaurantNavigationItem({
  route,
  setOpenDrawer,
}: MobilePartnerRestaurantNavigationItemProps) {
  const { pathname } = useLocation();

  return (
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
  );
}
