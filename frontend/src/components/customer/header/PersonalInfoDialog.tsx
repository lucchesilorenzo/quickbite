import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

import PersonalDetailsEditContainer from "./personal-details/PersonalDetailsEditContainer";

type PersonalInfoDialogProps = {
  openPersonalInfoDialog: boolean;
};

export default function PersonalInfoDialog({
  openPersonalInfoDialog,
}: PersonalInfoDialogProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleCloseDialog() {
    setSearchParams(
      { ...Object.fromEntries(searchParams), dialog: "main" },
      { replace: true },
    );
  }

  function handleGoBack() {
    setSearchParams(
      { ...Object.fromEntries(searchParams), dialog: "main" },
      { replace: true },
    );
  }

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openPersonalInfoDialog}
      onClose={handleCloseDialog}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" spacing={2}>
          <IconButton
            color="inherit"
            aria-label="close"
            onClick={handleGoBack}
            sx={{ p: 0 }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <DialogTitle
            component="h3"
            variant={isMobile ? "h6" : "h5"}
            sx={{ p: 0, fontWeight: 700 }}
          >
            Edit profile
          </DialogTitle>
        </Stack>

        <DialogContent sx={{ p: 1 }}>
          <PersonalDetailsEditContainer />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
