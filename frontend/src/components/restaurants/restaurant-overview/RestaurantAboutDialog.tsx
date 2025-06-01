import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import RestaurantAboutDialogTabs from "./tabs/RestaurantAboutDialogTabs";

type RestaurantAboutDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function RestaurantAboutDialog({
  open,
  onClose,
}: RestaurantAboutDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2}>
        <Stack direction="row" sx={{ justifyContent: "space-between", p: 2 }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>About</DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={onClose}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <RestaurantAboutDialogTabs />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
