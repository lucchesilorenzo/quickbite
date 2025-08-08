import { Box, Dialog, DialogContent, Stack } from "@mui/material";

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
  if (!image) return null;

  return (
    <Dialog
      open={openPreviewImageDialog}
      onClose={() => setOpenPreviewImageDialog(false)}
      fullWidth
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <DialogContent sx={{ p: 0 }}>
          <Box
            component="img"
            src={typeof image === "string" ? image : URL.createObjectURL(image)}
            sx={{ width: 1, height: 1, objectFit: "contain" }}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
