import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import LocationSearchArea from "./LocationSearchArea";

type LocationSearchDialogProps = {
  openLocationSearchDialog: boolean;
  setOpenLocationSearchDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LocationSearchDialog({
  openLocationSearchDialog,
  setOpenLocationSearchDialog,
}: LocationSearchDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Dialog
      open={openLocationSearchDialog}
      onClose={() => setOpenLocationSearchDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Enter your location
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenLocationSearchDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <LocationSearchArea
            openLocationSearchDialog={openLocationSearchDialog}
            setOpenLocationSearchDialog={setOpenLocationSearchDialog}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
