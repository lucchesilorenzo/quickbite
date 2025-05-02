import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

type SimpleHeadingWithDialogProps = {
  headingText: string;
  title: string;
  content: string;
  actionText: string;
};

export default function SimpleHeadingWithDialog({
  headingText,
  title,
  content,
  actionText,
}: SimpleHeadingWithDialogProps) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Stack direction="row" sx={{ alignItems: "center" }}>
      <Typography component="h1" variant="h6" sx={{ fontWeight: "700" }}>
        {headingText}
      </Typography>

      <IconButton color="inherit" onClick={() => setOpenDialog(true)}>
        <InfoOutlineIcon />
      </IconButton>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        disableRestoreFocus
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <DialogTitle sx={{ p: 0, fontWeight: "bold" }}>{title}</DialogTitle>

            <IconButton
              color="inherit"
              aria-label="close"
              onClick={() => setOpenDialog(false)}
              sx={{ p: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <DialogContent sx={{ p: 0 }}>{content}</DialogContent>

          <DialogActions>
            <Button variant="contained" component={Link} to="/faq">
              {actionText}
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </Stack>
  );
}
