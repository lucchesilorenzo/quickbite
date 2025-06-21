import { useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import PersonalInfoDialog from "./PersonalInfoDialog";

import { useAuth } from "@/hooks/contexts/useAuth";

export default function PersonalInfoItem() {
  const { user } = useAuth();

  const [openPersonalInfoDialog, setOpenPersonalInfoDialog] = useState(false);

  if (!user) return null;

  return (
    <>
      <ListItem disablePadding disableGutters>
        <ListItemButton
          sx={{ px: 3 }}
          onClick={() => setOpenPersonalInfoDialog(true)}
        >
          <ListItemIcon>
            <PersonOutlineOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={`${user.first_name} ${user.last_name}`}
            secondary={user.phone_number}
          />
          <ListItemIcon sx={{ justifyContent: "flex-end" }}>
            <ArrowForwardIosIcon color="inherit" />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>

      <PersonalInfoDialog
        openPersonalInfoDialog={openPersonalInfoDialog}
        setOpenPersonalInfoDialog={setOpenPersonalInfoDialog}
      />
    </>
  );
}
