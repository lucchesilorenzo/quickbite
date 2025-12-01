import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useGetJobPost } from "@partner/hooks/restaurants/job-posts/useGetJobPost";
import { useNotifications } from "@toolpad/core/useNotifications";

import EditJobPostForm from "../EditJobPostForm";

import Spinner from "@/components/common/Spinner";

type EditJobPostDialogProps = {
  jobPostId: string | null;
  openEditJobPostDialog: boolean;
  setOpenEditJobPostDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditJobPostDialog({
  jobPostId,
  openEditJobPostDialog,
  setOpenEditJobPostDialog,
}: EditJobPostDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const notifications = useNotifications();

  const { restaurant } = useRestaurant();

  const {
    data: jobPost,
    isLoading: isJobPostLoading,
    error: jobPostError,
  } = useGetJobPost({
    restaurantId: restaurant.id,
    jobPostId,
    enabled: openEditJobPostDialog,
  });

  if (jobPostError) {
    notifications.show(jobPostError.message, {
      key: "partner-get-job-post-error",
      severity: "error",
    });

    return null;
  }

  return (
    <Dialog
      open={openEditJobPostDialog}
      onClose={() => setOpenEditJobPostDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Edit job post
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenEditJobPostDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 1 }}>
          {isJobPostLoading ? (
            <Spinner />
          ) : (
            <EditJobPostForm
              jobPost={jobPost}
              setOpenEditJobPostDialog={setOpenEditJobPostDialog}
            />
          )}
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
