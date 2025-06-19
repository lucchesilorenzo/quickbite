import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

type PersonalInfoDialogProps = {
  openPersonalInfoDialog: boolean;
  setOpenPersonalInfoDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setHeaderCustomerDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PersonalInfoDialog({
  openPersonalInfoDialog,
  setOpenPersonalInfoDialog,
  setHeaderCustomerDialog,
}: PersonalInfoDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openPersonalInfoDialog}
      onClose={() => {
        setHeaderCustomerDialog(false);
        setOpenPersonalInfoDialog(false);
      }}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 4 }}>
        <Stack direction="row" spacing={2}>
          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => {
              setHeaderCustomerDialog(true);
              setOpenPersonalInfoDialog(false);
            }}
            sx={{ p: 0 }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <DialogTitle
            component="h3"
            variant={isMobile ? "h6" : "h5"}
            sx={{ p: 0, fontWeight: 700 }}
          >
            Personal info
          </DialogTitle>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <div>Personal info</div>
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
