import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import AddReviewForm from "./AddReviewForm";

import { Order } from "@/features/private/shared/types/order.types";

type AddReviewDialogProps = {
  order: Order;
  openAddReviewDialog: boolean;
  setOpenAddReviewDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddReviewDialog({
  order,
  openAddReviewDialog,
  setOpenAddReviewDialog,
}: AddReviewDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openAddReviewDialog}
      onClose={() => setOpenAddReviewDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Leave your review
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenAddReviewDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 1 }}>
          <AddReviewForm
            setOpenAddReviewDialog={setOpenAddReviewDialog}
            order={order}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
