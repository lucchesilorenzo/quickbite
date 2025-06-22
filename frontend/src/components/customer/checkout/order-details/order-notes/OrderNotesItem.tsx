import { useState } from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import OrderNotesDialog from "./OrderNotesDialog";

export default function OrderNotesItem() {
  const [openOrderNotesDialog, setOpenOrderNotesDialog] = useState(false);

  return (
    <>
      <ListItem disablePadding disableGutters>
        <ListItemButton
          sx={{ px: 3 }}
          onClick={() => setOpenOrderNotesDialog(true)}
        >
          <ListItemIcon>
            <DescriptionOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Order notes" />
          <ListItemIcon sx={{ justifyContent: "flex-end" }}>
            <AddCircleOutlineIcon color="inherit" />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>

      <OrderNotesDialog
        openOrderNotesDialog={openOrderNotesDialog}
        setOpenOrderNotesDialog={setOpenOrderNotesDialog}
      />
    </>
  );
}
