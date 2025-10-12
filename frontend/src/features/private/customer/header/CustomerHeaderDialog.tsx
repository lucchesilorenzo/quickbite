import { Fragment } from "react";

import { useLogout } from "@customer/hooks/auth/useLogout";
import CloseIcon from "@mui/icons-material/Close";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
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
import { Link, useSearchParams } from "react-router-dom";

import PersonalInfoDialog from "./PersonalInfoDialog";
import OrdersDialog from "./orders/OrdersDialog";

import { useAuth } from "@/contexts/AuthProvider";
import { useMultiCart } from "@/contexts/MultiCartProvider";

const customerHeaderDialogOptions = [
  {
    href: "/become-a-rider",
    label: "Become a rider",
    icon: DeliveryDiningOutlinedIcon,
    divider: false,
  },
  {
    href: "/become-a-partner",
    label: "Become a partner",
    icon: RestaurantOutlinedIcon,
    divider: true,
  },
];

export default function CustomerHeaderDialog() {
  const { user } = useAuth();
  const { emptyCarts } = useMultiCart();

  const { mutateAsync: logoutCustomer } = useLogout();

  const [searchParams, setSearchParams] = useSearchParams();

  const dialog = searchParams.get("dialog");

  const openHeaderDialog = dialog === "main";
  const openOrdersDialog = dialog === "orders";
  const openPersonalInfoDialog = dialog === "personal-info";

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  async function handleLogoutCustomer() {
    handleCloseDialog();
    await logoutCustomer();
    emptyCarts();
  }

  function handleMainDialog() {
    setSearchParams(
      { ...Object.fromEntries(searchParams), dialog: "main" },
      { replace: true },
    );
  }

  function handleOrdersDialog() {
    setSearchParams(
      { ...Object.fromEntries(searchParams), dialog: "orders" },
      { replace: true },
    );
  }

  function handlePersonalInfoDialog() {
    setSearchParams(
      { ...Object.fromEntries(searchParams), dialog: "personal-info" },
      { replace: true },
    );
  }

  function handleCloseDialog() {
    setSearchParams(
      { ...Object.fromEntries(searchParams), dialog: [] },
      { replace: true },
    );
  }

  return (
    <>
      <IconButton color="inherit" aria-label="menu" onClick={handleMainDialog}>
        <MenuIcon />
      </IconButton>

      <Dialog
        open={openHeaderDialog}
        onClose={handleCloseDialog}
        fullWidth={!isMobile}
        fullScreen={isMobile}
        disableRestoreFocus
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Box>
              <DialogTitle sx={{ p: 0, fontWeight: 700 }} gutterBottom>
                {user?.first_name} {user?.last_name}
              </DialogTitle>

              <Typography
                variant="body1"
                component="button"
                onClick={handlePersonalInfoDialog}
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontFamily: "inherit",
                  "&:hover": {
                    textDecoration: "none",
                  },
                }}
              >
                View profile
              </Typography>
            </Box>

            <IconButton
              color="inherit"
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{ p: 0, alignSelf: "flex-start" }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton onClick={handleOrdersDialog}>
                <ListItemIcon sx={{ color: grey[900] }}>
                  <ShoppingBagOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItemButton>
            </ListItem>

            <Divider />

            {customerHeaderDialogOptions.map((option) => (
              <Fragment key={option.href}>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to={option.href}
                    onClick={handleCloseDialog}
                  >
                    <ListItemIcon sx={{ color: grey[900] }}>
                      <option.icon />
                    </ListItemIcon>
                    <ListItemText primary={option.label} />
                  </ListItemButton>
                </ListItem>

                {option.divider && <Divider />}
              </Fragment>
            ))}

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogoutCustomer}>
                <ListItemIcon sx={{ color: grey[900] }}>
                  <PowerSettingsNewIcon />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </Dialog>

      <OrdersDialog openOrdersDialog={openOrdersDialog} />
      <PersonalInfoDialog openPersonalInfoDialog={openPersonalInfoDialog} />
    </>
  );
}
