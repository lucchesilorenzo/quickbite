import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useGetJobPost } from "@partner/hooks/restaurants/job-posts/useGetJobPost";

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
  const { restaurant } = useRestaurant();

  const {
    data: jobPostData,
    isLoading: isJobPostLoading,
    error: jobPostError,
  } = useGetJobPost({
    restaurantId: restaurant.id,
    jobPostId,
    enabled: openEditJobPostDialog,
  });

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openEditJobPostDialog}
      onClose={() => setOpenEditJobPostDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 0 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", p: 2 }}>
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

        <DialogContent sx={{ p: 0 }}>
          {isJobPostLoading && <Spinner />}

          {!isJobPostLoading && jobPostError && (
            <Alert severity="error">{jobPostError.message}</Alert>
          )}

          {!isJobPostLoading && !jobPostError && (
            <EditJobPostForm
              jobPost={jobPostData?.job_post}
              setOpenEditJobPostDialog={setOpenEditJobPostDialog}
            />
          )}
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
