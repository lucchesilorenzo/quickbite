import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import AddMenuItemForm from "./AddMenuItemForm";

type AddMenuItemDialogProps = {
  openAddMenuItemDialog: boolean;
  setOpenAddMenuItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddMenuItemDialog({
  openAddMenuItemDialog,
  setOpenAddMenuItemDialog,
}: AddMenuItemDialogProps) {
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
          <AddMenuItemForm
            setOpenAddMenuItemDialog={setOpenAddMenuItemDialog}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
