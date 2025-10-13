import { useState } from "react";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";

import AddMenuItemDialog from "./AddMenuItemDialog";

export default function AddMenuItemButton() {
  const [openAddMenuItemDialog, setOpenAddMenuItemDialog] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setOpenAddMenuItemDialog(true)}
        color="inherit"
        sx={{
          bgcolor: grey[200],
          "&:hover": {
            bgcolor: grey[300],
          },
        }}
        size="small"
      >
        <AddOutlinedIcon fontSize="small" />
      </IconButton>

      <AddMenuItemDialog
        openAddMenuItemDialog={openAddMenuItemDialog}
        setOpenAddMenuItemDialog={setOpenAddMenuItemDialog}
      />
    </>
  );
}
