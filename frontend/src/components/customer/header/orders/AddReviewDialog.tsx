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

import AddReviewForm from "./AddReviewForm";

import { RestaurantBase } from "@/types";

type AddReviewDialogProps = {
  openAddReviewDialog: boolean;
  setOpenAddReviewDialog: React.Dispatch<React.SetStateAction<boolean>>;
  restaurant: RestaurantBase;
};

export default function AddReviewDialog({
  openAddReviewDialog,
  setOpenAddReviewDialog,
  restaurant,
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
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Order notes</DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenAddReviewDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Add a review
          </Typography>

          <AddReviewForm
            setOpenAddReviewDialog={setOpenAddReviewDialog}
            restaurant={restaurant}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
