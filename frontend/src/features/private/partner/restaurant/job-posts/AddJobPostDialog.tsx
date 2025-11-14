import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import AddJobPostForm from "./AddJobPostForm";

type AddJobPostDialogProps = {
  openAddJobPostDialog: boolean;
  setOpenAddJobPostDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddJobPostDialog({
  openAddJobPostDialog,
  setOpenAddJobPostDialog,
}: AddJobPostDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openAddJobPostDialog}
      onClose={() => setOpenAddJobPostDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Add job post</DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenAddJobPostDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 1 }}>
          <AddJobPostForm setOpenAddJobPostDialog={setOpenAddJobPostDialog} />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
