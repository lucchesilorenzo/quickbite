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

import ForgotPasswordForm from "./ForgotPasswordForm";

type ForgotPasswordDialogProps = {
  openForgotPasswordDialog: boolean;
  setOpenForgotPasswordDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ForgotPasswordDialog({
  openForgotPasswordDialog,
  setOpenForgotPasswordDialog,
}: ForgotPasswordDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openForgotPasswordDialog}
      onClose={() => setOpenForgotPasswordDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Reset password
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenForgotPasswordDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 1 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Enter your email address below and we'll send you a link to reset
            your password.
          </Typography>

          <ForgotPasswordForm
            setOpenForgotPasswordDialog={setOpenForgotPasswordDialog}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
