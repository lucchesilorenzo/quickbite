import { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import DeleteMenuItemDialog from "./DeleteMenuItemDialog";
import EditMenuItemDialog from "./EditMenuItemDialog";

import env from "@/lib/env";
import { formatCurrency, truncateWords } from "@/lib/utils/formatting";
import { type MenuItem } from "@/types/menu/menu.types";

type MenuItemProps = {
  menuItem: MenuItem;
};

export default function MenuItem({ menuItem }: MenuItemProps) {
  const [openEditMenuItemDialog, setOpenEditMenuItemDialog] = useState(false);
  const [openDeleteMenuItemDialog, setOpenDeleteMenuItemDialog] =
    useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: menuItem.id });

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box
      {...attributes}
      ref={setNodeRef}
      sx={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Stack spacing={1}>
          <IconButton
            size="small"
            color="error"
            onClick={() => setOpenDeleteMenuItemDialog(true)}
            aria-label="Delete menu item"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>

          <IconButton
            {...listeners}
            size="small"
            sx={{
              cursor: "move",
              touchAction: "manipulation",
              "&:focus-visible": {
                bgcolor: grey[200],
              },
            }}
            aria-label="Drag to reorder"
          >
            <DragIndicatorIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Card variant="outlined" sx={{ flex: 1 }} elevation={3}>
          <Box
            role="button"
            sx={{
              p: 2,
              bgcolor: !menuItem.is_available ? grey[100] : "",
              "&:hover": {
                bgcolor: grey[100],
                cursor: "pointer",
              },
            }}
            onClick={() => setOpenEditMenuItemDialog(true)}
          >
            <Stack direction={isMobile ? "column" : "row"}>
              <Box sx={{ flex: 1, pr: 1 }}>
                <Typography
                  component="h3"
                  variant={isMobile ? "body1" : "h6"}
                  sx={{
                    fontWeight: 700,
                    color: !menuItem.is_available ? grey[500] : "",
                  }}
                >
                  {menuItem.name}
                </Typography>

                <CardContent sx={{ p: 0 }}>
                  <Typography
                    component="h4"
                    variant={isMobile ? "body2" : "body1"}
                    sx={{
                      fontWeight: menuItem.is_available ? 700 : "",
                      color: !menuItem.is_available ? grey[500] : "",
                    }}
                    gutterBottom
                  >
                    {menuItem.is_available
                      ? formatCurrency(menuItem.price)
                      : "Unavailable"}
                  </Typography>

                  {menuItem.description && (
                    <Typography
                      component="div"
                      variant="body2"
                      color={!menuItem.is_available ? "textDisabled" : ""}
                    >
                      {truncateWords(menuItem.description, 20)}
                    </Typography>
                  )}
                </CardContent>
              </Box>

              <Box sx={{ flexShrink: 0, position: "relative" }}>
                {menuItem.image ? (
                  <CardMedia
                    component="img"
                    sx={{
                      height: 100,
                      width: 150,
                      border: "1px solid #EDEDEC",
                      borderRadius: 2,
                    }}
                    image={`${env.VITE_BASE_URL}${menuItem.image}`}
                    alt={menuItem.name}
                    title={menuItem.name}
                  />
                ) : (
                  <Box
                    sx={{
                      display: { xs: "none", sm: "block" },
                      height: 100,
                      width: 150,
                    }}
                  ></Box>
                )}
              </Box>
            </Stack>
          </Box>
        </Card>

        <EditMenuItemDialog
          menuItem={menuItem}
          openEditMenuItemDialog={openEditMenuItemDialog}
          setOpenEditMenuItemDialog={setOpenEditMenuItemDialog}
        />

        <DeleteMenuItemDialog
          menuItem={menuItem}
          openDeleteMenuItemDialog={openDeleteMenuItemDialog}
          setOpenDeleteMenuItemDialog={setOpenDeleteMenuItemDialog}
        />
      </Stack>
    </Box>
  );
}
