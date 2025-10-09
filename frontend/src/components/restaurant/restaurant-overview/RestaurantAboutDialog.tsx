import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

import RestaurantAboutDialogTabs from "./tabs/RestaurantAboutDialogTabs";

type RestaurantAboutDialogProps = {
  openRestaurantAboutDialog: boolean;
  setOpenRestaurantAboutDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RestaurantAboutDialog({
  openRestaurantAboutDialog,
  setOpenRestaurantAboutDialog,
}: RestaurantAboutDialogProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  function handleCloseDialog() {
    setSearchParams(
      {
        ...Object.fromEntries(searchParams),
        tab: [],
        reviews_page: [],
        offers_page: [],
      },
      {
        replace: true,
      },
    );
    setOpenRestaurantAboutDialog(false);
  }

  return (
    <Dialog
      open={openRestaurantAboutDialog}
      onClose={handleCloseDialog}
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
            onClick={handleCloseDialog}
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
