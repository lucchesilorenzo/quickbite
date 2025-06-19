import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

import { headerDialogCustomerOptions } from "@/lib/data";
import { User } from "@/types";

type HeaderDialogCustomerProps = {
  customer: User;
};

export default function HeaderDialogCustomer({
  customer,
}: HeaderDialogCustomerProps) {
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
        disableRestoreFocus
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Box>
              <DialogTitle sx={{ p: 0, fontWeight: 700 }} gutterBottom>
                {customer.first_name} {customer.last_name}
              </DialogTitle>

              <Typography
                variant="body1"
                sx={{
                  textDecoration: "underline",
                  "&:hover": { cursor: "pointer", textDecoration: "none" },
                }}
              >
                View personal details
              </Typography>
            </Box>

            <IconButton
              color="inherit"
              aria-label="close"
              onClick={() => setOpenDialog(false)}
              sx={{ p: 0, alignSelf: "flex-start" }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <List disablePadding>
            {headerDialogCustomerOptions.map((option) => (
              <React.Fragment key={option.href}>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to={option.href}
                    onClick={() => setOpenDialog(false)}
                  >
                    <ListItemIcon sx={{ color: grey[900] }}>
                      <option.icon />
                    </ListItemIcon>
                    <ListItemText primary={option.label} />
                  </ListItemButton>
                </ListItem>

                {option.divider && <Divider />}
              </React.Fragment>
            ))}

            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpenDialog(false)}>
                <ListItemIcon sx={{ color: grey[900] }}>
                  <PowerSettingsNewIcon />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </Dialog>
    </>
  );
}
