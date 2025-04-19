import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
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

import { headerDialogOptions } from "@/lib/data";

export default function HeaderDialog() {
  const [openDialog, setOpenDialog] = useState(false);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="menu"
        onClick={() => setOpenDialog(true)}
      >
        <MenuIcon />
      </IconButton>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth={!isMobile}
        fullScreen={isMobile}
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <DialogTitle sx={{ p: 0, fontWeight: "bold" }}>
              My Account
            </DialogTitle>

            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={() => setOpenDialog(false)}
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
              to="/auth/login"
              onClick={() => setOpenDialog(false)}
            >
              Log in
            </Button>

            <Button
              variant="contained"
              component={Link}
              to="/auth/register"
              onClick={() => setOpenDialog(false)}
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
                  onClick={() => setOpenDialog(false)}
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
