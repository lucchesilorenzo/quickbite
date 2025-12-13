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
import { GridRowId } from "@mui/x-data-grid";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useDeleteJobPosts } from "@partner/hooks/restaurants/job-posts/useDeleteJobPosts";

type DeleteJobPostDialogProps = {
  jobPostIds?: Set<GridRowId>;
  openDeleteJobPostsDialog: boolean;
  setOpenDeleteJobPostsDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteJobPostDialog({
  jobPostIds,
  openDeleteJobPostsDialog,
  setOpenDeleteJobPostsDialog,
}: DeleteJobPostDialogProps) {
  const { restaurantData } = useRestaurant();

  const { mutate: deleteJobPosts, isPending: isDeleting } = useDeleteJobPosts({
    restaurantId: restaurantData.restaurant.id,
    jobPostIds,
    setOpenDeleteJobPostsDialog,
  });

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  function handleDeleteJobPosts() {
    deleteJobPosts();
  }

  return (
    <Dialog
      open={openDeleteJobPostsDialog}
      onClose={() => setOpenDeleteJobPostsDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Delete job posts
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenDeleteJobPostsDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          Are you sure you want to delete the selected job posts?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDeleteJobPostsDialog(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleDeleteJobPosts}
            disabled={!jobPostIds?.size}
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
