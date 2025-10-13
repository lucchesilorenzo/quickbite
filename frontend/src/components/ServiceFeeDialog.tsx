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

type ServiceFeeDialogProps = {
  openServiceFeeDialog: boolean;
  setOpenServiceFeeDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ServiceFeeDialog({
  openServiceFeeDialog,
  setOpenServiceFeeDialog,
}: ServiceFeeDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openServiceFeeDialog}
      onClose={() => setOpenServiceFeeDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Service fee</DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenServiceFeeDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <Typography sx={{ mb: 2 }}>
            The service fee aims to improve our overall offering by increasing
            the choice of partners and ensuring constant customer support.
          </Typography>
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
