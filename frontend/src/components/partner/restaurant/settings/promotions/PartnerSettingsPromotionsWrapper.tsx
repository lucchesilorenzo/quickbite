import { useState } from "react";

import PlusIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";

import PartnerSettingsPromotionsAddPromotionDialog from "./PartnerSettingsPromotionsAddPromotionDialog";

export default function PartnerSettingsPromotionsWrapper() {
  const [openAddPromotionDialog, setOpenAddPromotionDialog] = useState(false);

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<PlusIcon />}
        sx={{ mb: 4 }}
        onClick={() => setOpenAddPromotionDialog(true)}
      >
        Add promotion
      </Button>

      <PartnerSettingsPromotionsAddPromotionDialog
        openAddPromotionDialog={openAddPromotionDialog}
        setOpenAddPromotionDialog={setOpenAddPromotionDialog}
      />
    </Box>
  );
}
