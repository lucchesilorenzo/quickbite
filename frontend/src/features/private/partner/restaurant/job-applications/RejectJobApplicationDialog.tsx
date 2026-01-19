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

type RejectJobApplicationDialogProps = {
  jobApplicationId: string | null;
  openRejectJobApplicationDialog: boolean;
  setOpenRejectJobApplicationDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function RejectJobApplicationDialog({
  jobApplicationId,
  openRejectJobApplicationDialog,
  setOpenRejectJobApplicationDialog,
}: RejectJobApplicationDialogProps) {
  const { mutate: updateJobApplicationStatus, isPending: isRejecting } =
    useUpdateJobApplicationStatus({
      jobApplicationId,
      onCloseDialog: () => setOpenRejectJobApplicationDialog(false),
    });

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  function handleRejectJobApplication() {
    updateJobApplicationStatus({ status: "rejected" });
  }

  return (
    <Dialog
      open={openRejectJobApplicationDialog}
      onClose={() => setOpenRejectJobApplicationDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Reject job application
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenRejectJobApplicationDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          Are you sure you want to reject this job application?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenRejectJobApplicationDialog(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleRejectJobApplication}
            loading={isRejecting}
            loadingIndicator="Rejecting..."
          >
            Confirm
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
