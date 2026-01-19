import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import { useUpdateJobApplicationStatus } from "../../hooks/restaurants/job-applications/useUpdateJobApplicationStatus";

type ConfirmJobApplicationDialogProps = {
  jobApplicationId: string | null;
  openConfirmJobApplicationDialog: boolean;
  setOpenConfirmJobApplicationDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function ConfirmJobApplicationDialog({
  jobApplicationId,
  openConfirmJobApplicationDialog,
  setOpenConfirmJobApplicationDialog,
}: ConfirmJobApplicationDialogProps) {
  const { mutate: updateJobApplicationStatus, isPending: isConfirming } =
    useUpdateJobApplicationStatus({
      jobApplicationId,
      onCloseDialog: () => setOpenConfirmJobApplicationDialog(false),
    });

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  function handleConfirmJobApplication() {
    updateJobApplicationStatus({ status: "accepted" });
  }

  return (
    <Dialog
      open={openConfirmJobApplicationDialog}
      onClose={() => setOpenConfirmJobApplicationDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Confirm job application
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenConfirmJobApplicationDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          Are you sure you want to confirm this job application?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenConfirmJobApplicationDialog(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleConfirmJobApplication}
            loading={isConfirming}
            loadingIndicator="Confirming..."
          >
            Confirm
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
