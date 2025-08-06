import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";

type PartnerSettingsPromotionsEditPromotionDialogProps = {
  openEditPromotionDialog: boolean;
  setOpenEditPromotionDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PartnerSettingsPromotionsEditPromotionDialog({
  openEditPromotionDialog,
  setOpenEditPromotionDialog,
}: PartnerSettingsPromotionsEditPromotionDialogProps) {
  return (
    <Dialog
      open={openEditPromotionDialog}
      onClose={() => setOpenEditPromotionDialog(false)}
      fullWidth
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Edit promotion
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenEditPromotionDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>Form</DialogContent>
      </Stack>
    </Dialog>
  );
}
