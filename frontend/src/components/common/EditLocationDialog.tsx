import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import EditLocationForm from "./EditLocationForm";

import { useAddress } from "@/contexts/public/AddressProvider";

type EditLocationDialog = {
  openEditLocationDialog: boolean;
  onCloseDialogs: () => void;
};

export default function EditLocationDialog({
  openEditLocationDialog,
  onCloseDialogs,
}: EditLocationDialog) {
  const { currentAddress } = useAddress();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Dialog
      open={openEditLocationDialog}
      onClose={onCloseDialogs}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Help us find you
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={onCloseDialogs}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <Stack spacing={1}>
            <DialogContentText>
              To get more accurate search results and delivery times and costs,
              add more details to your address:
              <Box component="span" sx={{ ml: 1 }}>
                <Typography component="span" sx={{ fontWeight: 700 }}>
                  {`"${currentAddress?.display_name}"`}
                </Typography>
                .
              </Box>
            </DialogContentText>

            <EditLocationForm onCloseDialogs={onCloseDialogs} />
          </Stack>
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
