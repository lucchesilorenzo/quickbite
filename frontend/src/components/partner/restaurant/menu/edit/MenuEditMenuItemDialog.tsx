import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import MenuEditMenuItemForm from "./MenuEditMenuItemForm";

import { MenuItem } from "@/types";

type MenuEditMenuItemDialogProps = {
  menuItem: MenuItem;
  openEditMenuItemDialog: boolean;
  setOpenEditMenuItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MenuEditMenuItemDialog({
  menuItem,
  openEditMenuItemDialog,
  setOpenEditMenuItemDialog,
}: MenuEditMenuItemDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openEditMenuItemDialog}
      onClose={() => setOpenEditMenuItemDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Edit menu item
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenEditMenuItemDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 1 }}>
          <MenuEditMenuItemForm
            menuItem={menuItem}
            setOpenEditMenuItemDialog={setOpenEditMenuItemDialog}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
