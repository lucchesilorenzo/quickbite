import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { useAuth } from "@/hooks/contexts/useAuth";

export default function CheckoutOrderDetailsList() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <List disablePadding>
      <ListItem disablePadding disableGutters>
        <ListItemButton sx={{ px: 3 }} onClick={() => {}}>
          <ListItemIcon>
            <PersonOutlineOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={`${user.first_name} ${user.last_name}`}
            secondary={user.phone_number}
          />
          <ListItemIcon sx={{ justifyContent: "flex-end" }}>
            <ArrowForwardIosIcon color="inherit" />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    </List>
  );
}
