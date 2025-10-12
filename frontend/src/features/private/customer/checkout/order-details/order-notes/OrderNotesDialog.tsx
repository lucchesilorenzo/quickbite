import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import OrderNotesForm from "./OrderNotesForm";

type OrderNotesDialogProps = {
  openOrderNotesDialog: boolean;
  setOpenOrderNotesDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OrderNotesDialog({
  openOrderNotesDialog,
  setOpenOrderNotesDialog,
}: OrderNotesDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openOrderNotesDialog}
      onClose={() => setOpenOrderNotesDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Order notes</DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenOrderNotesDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Add a note for your order. If any of the order recipients have food
            allergies, please contact the restaurant directly. Do not include
            details about allergies or intolerances in this note.
          </Typography>

          <OrderNotesForm setOpenOrderNotesDialog={setOpenOrderNotesDialog} />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
