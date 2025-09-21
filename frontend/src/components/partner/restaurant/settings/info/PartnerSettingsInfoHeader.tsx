import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import Save from "@mui/icons-material/Save";
import { Button, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

import PartnerHeadingBlock from "../../common/PartnerHeadingBlock";

import { usePartnerRestaurantSettingsInfo } from "@/hooks/contexts/usePartnerRestaurantSettingsInfo";
import { TPartnerRestaurantSettingsInfoFormSchema } from "@/validations/partner-restaurant-settings-validations";

export default function PartnerSettingsInfoHeader() {
  const { editMode, setEditMode } = usePartnerRestaurantSettingsInfo();

  const {
    formState: { isSubmitting },
  } = useFormContext<TPartnerRestaurantSettingsInfoFormSchema>();

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
      <PartnerHeadingBlock
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
          disabled={isSubmitting}
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
