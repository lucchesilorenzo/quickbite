import { useState } from "react";

import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useLogout } from "@private/partner/hooks/auth/useLogout";
import { Link } from "react-router-dom";

import { useAuth } from "@/contexts/AuthProvider";
import { getColorByName } from "@/lib/utils/colors";

export default function ProfileMenu() {
  const { user } = useAuth();

  const { mutateAsync: logoutPartner } = useLogout();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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

          <Typography variant={isMobile ? "body2" : "body1"}>
            Settings
          </Typography>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogoutPartner}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>

          <Typography variant={isMobile ? "body2" : "body1"}>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
