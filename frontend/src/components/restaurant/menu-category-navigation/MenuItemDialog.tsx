import { useState } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import MenuItemDialogActions from "./MenuItemDialogActions";
import MenuItemInfoDialog from "./MenuItemInfoDialog";

import env from "@/lib/env";
import { formatCurrency } from "@/lib/utils/formatting";
import { MenuItem } from "@/types";

type MenuItemDialogProps = {
  menuItem: MenuItem;
  openMenuItemDialog: boolean;
  setOpenMenuItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MenuItemDialog({
  menuItem,
  openMenuItemDialog,
  setOpenMenuItemDialog,
}: MenuItemDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [openMenuItemInfoDialog, setOpenMenuItemInfoDialog] = useState(false);

  return (
    <>
      <Dialog
        open={openMenuItemDialog}
        onClose={() => {
          setOpenMenuItemDialog(false);
          setOpenMenuItemInfoDialog(false);
        }}
        fullWidth={!isMobile}
        fullScreen={isMobile}
        disableRestoreFocus
      >
        <Stack sx={{ p: 2 }}>
          {menuItem.image && (
            <>
              <Box
                component="img"
                sx={{
                  position: "relative",
                  objectFit: "cover",
                  border: "1px solid #EDEDEC",
                  borderRadius: 2,
                  mb: 2,
                }}
                src={`${env.VITE_BASE_URL}${menuItem.image}`}
                alt={menuItem.name}
                title={menuItem.name}
              />

              <IconButton
                sx={{
                  bgcolor: grey[200],
                  "&:hover": {
                    bgcolor: grey[300],
                  },
                  borderRadius: 5,
                  position: "absolute",
                  top: 25,
                  right: 25,
                }}
                size="small"
                aria-label="close"
                onClick={() => setOpenMenuItemDialog(false)}
              >
                <ClearIcon />
              </IconButton>
            </>
          )}

          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <DialogTitle
                variant={isMobile ? "h6" : "h5"}
                sx={{ p: 0, fontWeight: 700 }}
              >
                {menuItem.name}
              </DialogTitle>

              <IconButton
                color="inherit"
                sx={{ "&:hover": { bgcolor: "transparent" } }}
                onClick={() => {
                  setOpenMenuItemDialog(false);
                  setOpenMenuItemInfoDialog(true);
                }}
              >
                <InfoOutlineIcon />
              </IconButton>
            </Stack>

            {!menuItem.image && (
              <IconButton
                color="inherit"
                aria-label="close"
                onClick={() => setOpenMenuItemDialog(false)}
                sx={{ p: 0 }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Stack>

          <Typography
            component="span"
            variant={isMobile ? "body1" : "h6"}
            sx={{ fontWeight: 700 }}
          >
            {formatCurrency(menuItem.price)}
          </Typography>

          <DialogContent sx={{ p: 0, mt: 1 }}>
            {menuItem.description && (
              <Typography variant="body1" component="div">
                {menuItem.description}
              </Typography>
            )}
          </DialogContent>
        </Stack>

        <MenuItemDialogActions
          menuItem={menuItem}
          setOpenMenuItemDialog={setOpenMenuItemDialog}
        />
      </Dialog>

      <MenuItemInfoDialog
        type="from-search"
        menuItem={menuItem}
        openMenuItemInfoDialog={openMenuItemInfoDialog}
        setOpenMenuItemDialog={setOpenMenuItemDialog}
        setOpenMenuItemInfoDialog={setOpenMenuItemInfoDialog}
      />
    </>
  );
}
