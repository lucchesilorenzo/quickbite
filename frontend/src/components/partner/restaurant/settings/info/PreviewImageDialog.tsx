import { useEffect, useState } from "react";

import { Box, Dialog, DialogContent, Stack, Typography } from "@mui/material";

type PreviewImageDialogProps = {
  openPreviewImageDialog: boolean;
  image?: File | string | null;
  setOpenPreviewImageDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PreviewImageDialog({
  openPreviewImageDialog,
  image,
  setOpenPreviewImageDialog,
}: PreviewImageDialogProps) {
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setLoadError(false);
  }, [image]);

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
