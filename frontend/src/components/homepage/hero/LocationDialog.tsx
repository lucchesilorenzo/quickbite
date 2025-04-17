import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Stack, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useCookies } from "react-cookie";

import LocationForm from "./LocationForm";

type LocationDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function LocationDialog({ open, onClose }: LocationDialogProps) {
  const [cookie] = useCookies(["address"]);

  return (
    <Dialog open={open} onClose={onClose}>
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: "bold" }}>
            Help us find you
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={onClose}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <Stack spacing={1}>
            <DialogContentText>
              To get more accurate search results and delivery times and costs,
              add more details to your address:{" "}
              <Typography component="span" sx={{ fontWeight: "bold" }}>
                {`"${cookie.address.display_name}"`}
              </Typography>
              .
            </DialogContentText>

            <LocationForm />
          </Stack>
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
