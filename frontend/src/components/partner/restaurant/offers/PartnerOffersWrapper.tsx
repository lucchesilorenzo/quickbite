import { useState } from "react";

import PlusIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";

import PartnerOffersAddOfferDialog from "./PartnerOffersAddOfferDialog";
import PartnerOffersList from "./PartnerOffersList";

export default function PartnerOffersWrapper() {
  const [openAddOfferDialog, setOpenAddOfferDialog] = useState(false);

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<PlusIcon />}
        sx={{ mb: 4 }}
        onClick={() => setOpenAddOfferDialog(true)}
      >
        Add offer
      </Button>

      <PartnerOffersList />

      <PartnerOffersAddOfferDialog
        openAddOfferDialog={openAddOfferDialog}
        setOpenAddOfferDialog={setOpenAddOfferDialog}
      />
    </Box>
  );
}
