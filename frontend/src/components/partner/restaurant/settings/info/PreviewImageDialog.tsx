import { useState } from "react";

import { Box, Dialog, DialogContent, Stack, Typography } from "@mui/material";

type ViewOrderDialogProps = {
  openPreviewImageDialog: boolean;
  setOpenPreviewImageDialog: React.Dispatch<React.SetStateAction<boolean>>;
  image?: File | string;
};

export default function ViewOrderDialog({
  openPreviewImageDialog,
  setOpenPreviewImageDialog,
  image,
}: ViewOrderDialogProps) {
  const [loadError, setLoadError] = useState(false);

  if (!image) return null;

  const src = typeof image === "string" ? image : URL.createObjectURL(image);

  return (
    <Dialog
      open={openPreviewImageDialog}
      onClose={() => setOpenPreviewImageDialog(false)}
      fullWidth
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <DialogContent
          sx={{
            p: 0,
            minHeight: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loadError ? (
            <Typography color="error">Unable to load image</Typography>
          ) : (
            <Box
              component="img"
              src={src}
              onError={() => setLoadError(true)}
              sx={{ width: 1, height: 1, objectFit: "contain" }}
            />
          )}
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
