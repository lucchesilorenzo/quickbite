import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";

import { useJobPosts } from "../contexts/JobPostsProvider";
import { useGetJobPost } from "../hooks/job-posts/useGetJobPost";
import JobPostDetails from "./JobPostDetails";

import Spinner from "@/components/common/Spinner";

export default function ViewJobPostDetailsDialog() {
  const { jobPostId, handleJobPostChange } = useJobPosts();

  const {
    data: jobPostData,
    isLoading: isLoadingJobPost,
    error: jobPostError,
  } = useGetJobPost({ jobPostId });

  return (
    <Dialog
      open={!!jobPostData?.job_post}
      onClose={() => handleJobPostChange(null)}
      fullScreen
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Job post details
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => handleJobPostChange(null)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 1 }}>
          {isLoadingJobPost && <Spinner />}

          {!isLoadingJobPost && jobPostError && (
            <Alert severity="error">{jobPostError.message}</Alert>
          )}

          {!isLoadingJobPost && !jobPostError && jobPostData?.job_post && (
            <JobPostDetails jobPost={jobPostData.job_post} />
          )}
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
