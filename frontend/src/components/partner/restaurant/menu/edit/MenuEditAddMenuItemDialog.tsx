import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import MenuEditAddMenuItemForm from "./MenuEditAddMenuItemForm";

type MenuEditAddMenuItemDialogProps = {
  openAddMenuItemDialog: boolean;
  setOpenAddMenuItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MenuEditAddMenuItemDialog({
  openAddMenuItemDialog,
  setOpenAddMenuItemDialog,
}: MenuEditAddMenuItemDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openAddMenuItemDialog}
      onClose={() => setOpenAddMenuItemDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Add menu item
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenAddMenuItemDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 1 }}>
          <MenuEditAddMenuItemForm
            setOpenAddMenuItemDialog={setOpenAddMenuItemDialog}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
