import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import Save from "@mui/icons-material/Save";
import { Button, Stack } from "@mui/material";
import HeadingBlock from "@partner/components/HeadingBlock";
import { useInfo } from "@partner/restaurant/settings/contexts/InfoProvider";
import { TRestaurantSettingsInfoFormSchema } from "@partner/schemas/restaurant-settings.schema";
import { useFormContext } from "react-hook-form";

export default function InfoHeader() {
  const { editMode, setEditMode } = useInfo();

  const {
    formState: { isSubmitting },
  } = useFormContext<TRestaurantSettingsInfoFormSchema>();

  function handleEditMode(e: React.MouseEvent<HTMLButtonElement>) {
    if (!editMode) {
      e.preventDefault();
      setEditMode(true);
    }
  }

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        justifyContent: { sm: "space-between" },
        alignItems: { sm: "center" },
        mb: { xs: 2, sm: 0 },
      }}
    >
      <HeadingBlock
        title="Restaurant info"
        description="Edit your restaurant information"
        backButton
      />

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
          type={editMode ? "submit" : "button"}
          variant="contained"
          loading={isSubmitting}
          loadingIndicator="Saving..."
          startIcon={editMode ? <Save /> : <EditIcon />}
          onClick={handleEditMode}
        >
          {editMode ? "Save" : "Edit"}
        </Button>
      </Stack>
    </Stack>
  );
}
