import { useState } from "react";

import PlusIcon from "@mui/icons-material/Add";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import MenuItemDialog from "../menu-category-navigation/MenuItemDialog";

import env from "@/lib/env";
import { formatCurrency, truncateWords } from "@/lib/utils";
import type { MenuItem } from "@/types";

type MenuItemRowProps = {
  menuItem: MenuItem;
};

export default function MenuItemRow({ menuItem }: MenuItemRowProps) {
  const [openMenuItemDialog, setOpenMenuItemDialog] = useState(false);

  return (
    <>
      <Card elevation={3}>
        <CardActionArea
          disabled={!menuItem.is_available}
          sx={{
            p: 2,
            bgcolor: !menuItem.is_available ? grey[100] : "",
            "&:hover": { bgcolor: grey[100] },
          }}
          onClick={() => setOpenMenuItemDialog(true)}
        >
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Box sx={{ flex: 1, pr: 1 }}>
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <DialogTitle
                  component="h3"
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    p: 0,
                    color: !menuItem.is_available ? grey[500] : "",
                  }}
                >
                  {menuItem.name}
                </DialogTitle>

                <IconButton
                  color="inherit"
                  sx={{ "&:hover": { bgcolor: "transparent" } }}
                  onClick={() => {}}
                >
                  <InfoOutlineIcon />
                </IconButton>
              </Stack>

              <CardContent sx={{ p: 0 }}>
                <Typography
                  component="h4"
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: !menuItem.is_available ? grey[500] : "",
                  }}
                  gutterBottom
                >
                  {menuItem.is_available
                    ? formatCurrency(menuItem.price)
                    : "Unavailable"}
                </Typography>

                {menuItem.description && (
                  <Typography component="div" variant="body1">
                    {truncateWords(menuItem.description, 20)}
                  </Typography>
                )}
              </CardContent>
            </Box>

            <Box sx={{ flexShrink: 0 }}>
              {menuItem.image && (
                <CardMedia
                  component="img"
                  sx={{
                    height: 100,
                    width: 150,
                    position: "relative",
                    border: "1px solid #EDEDEC",
                    borderRadius: 2,
                  }}
                  image={`${env.VITE_BASE_URL}${menuItem.image}`}
                  alt={menuItem.name}
                  title={menuItem.name}
                />
              )}

              {menuItem.is_available && (
                <IconButton
                  sx={{
                    bgcolor: "white",
                    "&:hover": {
                      bgcolor: grey[100],
                    },
                    border: "1px solid #EDEDEC",
                    borderRadius: 5,
                    position: "absolute",
                    top: 18,
                    right: 8,
                  }}
                  aria-label="add"
                  size="small"
                >
                  <PlusIcon color="primary" fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Stack>
        </CardActionArea>
      </Card>

      <MenuItemDialog
        menuItem={menuItem}
        openMenuItemDialog={openMenuItemDialog}
        setOpenMenuItemDialog={setOpenMenuItemDialog}
      />
    </>
  );
}
