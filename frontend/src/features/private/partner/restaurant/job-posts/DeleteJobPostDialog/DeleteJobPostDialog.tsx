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
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { restaurant } = useRestaurant();

  const { mutateAsync: deleteJobPost, isPending: isDeleting } =
    useDeleteJobPost(restaurant.id, jobPostId);

  async function handleDeleteJobPost() {
    await deleteJobPost();
    setOpenDeleteJobPostDialog(false);
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
            disabled={isDeleting}
            loading={isDeleting}
            loadingIndicator="Deleting..."
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
