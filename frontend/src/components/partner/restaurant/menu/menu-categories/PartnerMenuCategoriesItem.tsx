import { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Chip, IconButton, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";

import PartnerMenuCategoriesDeleteMenuCategoryDialog from "./PartnerMenuCategoriesDeleteMenuCategoryDialog";
import PartnerMenuCategoriesEditMenuCategoryDialog from "./PartnerMenuCategoriesEditMenuCategoryDialog";

import { PartnerMenu } from "@/types";

type PartnerMenuCategoriesItemProps = {
  menuCategory: PartnerMenu;
};

export default function PartnerMenuCategoriesItem({
  menuCategory,
}: PartnerMenuCategoriesItemProps) {
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

      <PartnerMenuCategoriesEditMenuCategoryDialog
        menuCategory={menuCategory}
        openEditMenuCategoryDialog={openEditMenuCategoryDialog}
        setOpenEditMenuCategoryDialog={setOpenEditMenuCategoryDialog}
      />

      <PartnerMenuCategoriesDeleteMenuCategoryDialog
        menuCategory={menuCategory}
        openDeleteMenuCategoryDialog={openDeleteMenuCategoryDialog}
        setOpenDeleteMenuCategoryDialog={setOpenDeleteMenuCategoryDialog}
      />
    </Stack>
  );
}
