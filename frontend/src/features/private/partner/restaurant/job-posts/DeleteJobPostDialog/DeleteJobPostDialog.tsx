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
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useDeleteJobPost } from "@partner/hooks/restaurants/job-posts/useDeleteJobPost";

type DeleteJobPostDialogProps = {
  jobPostId: string | null;
  openDeleteJobPostDialog: boolean;
  setOpenDeleteJobPostDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteJobPostDialog({
  jobPostId,
  openDeleteJobPostDialog,
  setOpenDeleteJobPostDialog,
}: DeleteJobPostDialogProps) {
  const { restaurantData } = useRestaurant();

  const { mutate: deleteJobPost, isPending: isDeleting } = useDeleteJobPost({
    restaurantId: restaurantData.restaurant.id,
    jobPostId,
    setOpenDeleteJobPostDialog,
  });

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  function handleDeleteJobPost() {
    deleteJobPost();
  }

  return (
    <Dialog
      open={openDeleteJobPostDialog}
      onClose={() => setOpenDeleteJobPostDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Delete job post
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenDeleteJobPostDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          Are you sure you want to delete this job post?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDeleteJobPostDialog(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleDeleteJobPost}
            loading={isDeleting}
            loadingIndicator="Deleting..."
          >
            Confirm
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
