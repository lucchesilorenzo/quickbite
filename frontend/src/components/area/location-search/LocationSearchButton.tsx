import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, Stack, Typography } from "@mui/material";

type LocationSearchButtonProps = {
  fullAddress?: string;
  setOpenLocationSearchDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LocationSearchButton({
  fullAddress,
  setOpenLocationSearchDialog,
}: LocationSearchButtonProps) {
  return (
    <Button
      variant="contained"
      sx={{ textTransform: "none" }}
      color="inherit"
      onClick={() => setOpenLocationSearchDialog(true)}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          maxWidth: {
            xs: 150,
            md: "100%",
          },
        }}
      >
        <LocationOnIcon color="primary" fontSize="small" />

        <Typography
          variant="body2"
          component="span"
          color="textPrimary"
          sx={{ fontWeight: "700" }}
          noWrap
        >
          {fullAddress || "Search location"}
        </Typography>
      </Stack>
    </Button>
  );
}
