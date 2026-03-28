import { useLogout as useCustomerLogout } from "@customer/hooks/auth/useLogout";
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
  useMediaQuery,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";
import { useLogout as usePartnerLogout } from "@partner/hooks/auth/useLogout";
import { useLogout as useRiderLogout } from "@rider/hooks/auth/useLogout";
import { useSearchParams } from "react-router-dom";

import { useAuth } from "@/contexts/AuthProvider";
import { useMultiCart } from "@/contexts/MultiCartProvider";
import { isCustomer, isPartner, isRider } from "@/lib/utils/auth.utils";

export default function AuthHeaderDialog() {
  const { user } = useAuth();
  const { emptyCarts } = useMultiCart();

  const { mutateAsync: logoutCustomer, isPending: isLoggingOutCustomer } =
    useCustomerLogout();
  const { mutateAsync: logoutPartner, isPending: isLoggingOutPartner } =
    usePartnerLogout();
  const { mutateAsync: logoutRider, isPending: isLoggingOutRider } =
    useRiderLogout();

  const [searchParams, setSearchParams] = useSearchParams();

  const dialog = searchParams.get("dialog");
  const openHeaderDialog = dialog === "main";
  const isLoading =
    isLoggingOutCustomer || isLoggingOutPartner || isLoggingOutRider;
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  async function handleLogout() {
    if (isCustomer(user)) {
      await logoutCustomer();
      emptyCarts();
      return;
    }

    if (isPartner(user)) {
      await logoutPartner();
      return;
    }

    if (isRider(user)) {
      await logoutRider();
      return;
    }

    handleCloseDialog();
  }

  function handleMainDialog() {
    setSearchParams(
      { ...Object.fromEntries(searchParams), dialog: "main" },
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
              <ListItemButton onClick={handleLogout} disabled={isLoading}>
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
