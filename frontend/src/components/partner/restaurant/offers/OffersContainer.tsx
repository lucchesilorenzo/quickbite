import { useState } from "react";

import PlusIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";

import AddOfferDialog from "./AddOfferDialog";
import OffersList from "./OffersList";

export default function OffersContainer() {
  const [openAddOfferDialog, setOpenAddOfferDialog] = useState(false);

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<PlusIcon />}
        sx={{ mb: 3 }}
        onClick={() => setOpenAddOfferDialog(true)}
      >
        Add offer
      </Button>

      <OffersList />

      <AddOfferDialog
        openAddOfferDialog={openAddOfferDialog}
        setOpenAddOfferDialog={setOpenAddOfferDialog}
      />
    </Box>
  );
}
