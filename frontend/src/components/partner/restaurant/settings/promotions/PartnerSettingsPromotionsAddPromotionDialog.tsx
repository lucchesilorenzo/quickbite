import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";

import PartnerSettingsPromotionsAddPromotionForm from "./PartnerSettingsPromotionsAddPromotionForm";

type PartnerSettingsPromotionsAddPromotionDialogProps = {
  openAddPromotionDialog: boolean;
  setOpenAddPromotionDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PartnerSettingsPromotionsAddPromotionDialog({
  openAddPromotionDialog,
  setOpenAddPromotionDialog,
}: PartnerSettingsPromotionsAddPromotionDialogProps) {
  return (
    <Dialog
      open={openAddPromotionDialog}
      onClose={() => setOpenAddPromotionDialog(false)}
      fullWidth
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Add promotion
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenAddPromotionDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 1 }}>
          <PartnerSettingsPromotionsAddPromotionForm
            setOpenAddPromotionDialog={setOpenAddPromotionDialog}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
