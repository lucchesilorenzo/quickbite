import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import PersonalInfoForm from "./PersonalInfoForm";

type PersonalInfoDialogProps = {
  openPersonalInfoDialog: boolean;
  setOpenPersonalInfoDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PersonalInfoDialog({
  openPersonalInfoDialog,
  setOpenPersonalInfoDialog,
}: PersonalInfoDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openPersonalInfoDialog}
      onClose={() => setOpenPersonalInfoDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Your data</DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenPersonalInfoDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 1 }}>
          <PersonalInfoForm
            setOpenPersonalInfoDialog={setOpenPersonalInfoDialog}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
