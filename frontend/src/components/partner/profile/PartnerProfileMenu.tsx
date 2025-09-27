import { useState } from "react";

import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import { Box, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

import { useAuth } from "@/hooks/contexts/useAuth";
import { useLogoutPartner } from "@/hooks/react-query/private/partners/auth/useLogoutPartner";
import { getColorByName } from "@/lib/utils";

export default function PartnerProfileMenu() {
  const { user } = useAuth();
  const { mutateAsync: logoutPartner } = useLogoutPartner();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget);
  }

  async function handleLogoutPartner() {
    await logoutPartner();
  }

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        aria-controls={anchorEl ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? "true" : undefined}
      >
        <Avatar
          alt={`${user?.first_name} ${user?.last_name}`}
          sx={{
            width: 32,
            height: 32,
            bgcolor: getColorByName(user?.first_name),
          }}
        >
          {user?.first_name[0]}
        </Avatar>
      </IconButton>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={Link} to="/partner/profile/general">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogoutPartner}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
