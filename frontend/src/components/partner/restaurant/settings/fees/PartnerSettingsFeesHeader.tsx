import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import Save from "@mui/icons-material/Save";
import { Box, Button, Stack, Typography } from "@mui/material";

type PartnerSettingsFeesHeaderProps = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PartnerSettingsFeesHeader({
  editMode,
  setEditMode,
}: PartnerSettingsFeesHeaderProps) {
  function handleEditMode(e: React.MouseEvent<HTMLButtonElement>) {
    if (!editMode) {
      e.preventDefault();
      setEditMode(true);
    }
  }

  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Fees
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Set your fees for delivery, service and minimum order.
        </Typography>
      </Box>

      <Stack direction="row" spacing={2}>
        {editMode && (
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={() => setEditMode(false)}
          >
            Cancel
          </Button>
        )}

        <Button
          variant="contained"
          type={editMode ? "submit" : "button"}
          startIcon={editMode ? <Save /> : <EditIcon />}
          onClick={handleEditMode}
        >
          {editMode ? "Save" : "Edit"}
        </Button>
      </Stack>
    </Stack>
  );
}
