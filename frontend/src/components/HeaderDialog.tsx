import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const headerDialogOptions = [
  {
    href: "/become-a-rider",
    label: "Become a rider",
    icon: DeliveryDiningOutlinedIcon,
  },
  {
    href: "/partner/auth/register",
    label: "Become a partner",
    icon: RestaurantOutlinedIcon,
  },
];

export default function HeaderDialog() {
  const [openHeaderDialog, setOpenHeaderDialog] = useState(false);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="menu"
        onClick={() => setOpenHeaderDialog(true)}
      >
        <MenuIcon />
      </IconButton>

      <Dialog
        open={openHeaderDialog}
        onClose={() => setOpenHeaderDialog(false)}
        fullWidth={!isMobile}
        fullScreen={isMobile}
        disableRestoreFocus
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <DialogTitle sx={{ p: 0, fontWeight: 700 }}>My Account</DialogTitle>

            <IconButton
              color="inherit"
              aria-label="close"
              onClick={() => setOpenHeaderDialog(false)}
              sx={{ p: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="inherit"
              component={Link}
              to="/customer/auth/login"
              onClick={() => setOpenHeaderDialog(false)}
            >
              Log in
            </Button>

            <Button
              variant="contained"
              component={Link}
              to="/customer/auth/register"
              onClick={() => setOpenHeaderDialog(false)}
            >
              Create an account
            </Button>
          </Stack>

          <Divider />

          <List>
            {headerDialogOptions.map((option) => (
              <ListItem disablePadding key={option.href}>
                <ListItemButton
                  component={Link}
                  to={option.href}
                  onClick={() => setOpenHeaderDialog(false)}
                >
                  <ListItemIcon>
                    <option.icon />
                  </ListItemIcon>
                  <ListItemText primary={option.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Dialog>
    </>
  );
}
