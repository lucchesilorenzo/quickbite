import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import Save from "@mui/icons-material/Save";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

import PartnerBackButton from "@/components/partner/restaurant/common/PartnerBackButton";
import { usePartnerRestaurantSettingsFees } from "@/hooks/contexts/usePartnerRestaurantSettingsFees";
import { TPartnerRestaurantSettingsFeesFormSchema } from "@/validations/partner-restaurant-settings-validations";

export default function MobilePartnerSettingsFeesHeader() {
  const { editMode, setEditMode } = usePartnerRestaurantSettingsFees();

  const {
    formState: { isSubmitting },
  } = useFormContext<TPartnerRestaurantSettingsFeesFormSchema>();

  function handleEditMode(e: React.MouseEvent<HTMLButtonElement>) {
    if (!editMode) {
      e.preventDefault();
      setEditMode(true);
    }
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Box>
        <PartnerBackButton />

        <Typography variant="h5" sx={{ fontWeight: 600, my: 1 }}>
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
    </Box>
  );
}
