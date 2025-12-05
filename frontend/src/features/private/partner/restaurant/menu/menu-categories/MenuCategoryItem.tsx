import { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Chip, IconButton, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";

import DeleteMenuCategoryDialog from "./DeleteMenuCategoryDialog";
import EditMenuCategoryDialog from "./EditMenuCategoryDialog";

import { PartnerMenu } from "@/features/private/partner/types/menu/menu.types";

type MenuCategoryItemProps = {
  menuCategory: PartnerMenu;
};

export default function MenuCategoryItem({
  menuCategory,
}: MenuCategoryItemProps) {
  const [openEditMenuCategoryDialog, setOpenEditMenuCategoryDialog] =
    useState(false);
  const [openDeleteMenuCategoryDialog, setOpenDeleteMenuCategoryDialog] =
    useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: menuCategory.id });

  return (
    <Stack
      {...attributes}
      direction="row"
      alignItems="center"
      ref={setNodeRef}
      sx={{ transform: CSS.Transform.toString(transform), transition }}
    >
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

      <Chip
        label={`(${menuCategory.order + 1}) ${menuCategory.name}`}
        onClick={() => setOpenEditMenuCategoryDialog(true)}
        onDelete={() => setOpenDeleteMenuCategoryDialog(true)}
      />

      <EditMenuCategoryDialog
        menuCategory={menuCategory}
        openEditMenuCategoryDialog={openEditMenuCategoryDialog}
        setOpenEditMenuCategoryDialog={setOpenEditMenuCategoryDialog}
      />

      <DeleteMenuCategoryDialog
        menuCategory={menuCategory}
        openDeleteMenuCategoryDialog={openDeleteMenuCategoryDialog}
        setOpenDeleteMenuCategoryDialog={setOpenDeleteMenuCategoryDialog}
      />
    </Stack>
  );
}
