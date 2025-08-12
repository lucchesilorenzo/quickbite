import { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Chip, IconButton, Stack } from "@mui/material";

import PartnerMenuCategoriesDeleteMenuCategoryDialog from "./PartnerMenuCategoriesDeleteMenuCategoryDialog";
import PartnerMenuCategoriesEditMenuCategoryDialog from "./PartnerMenuCategoriesEditMenuCategoryDialog";

import { MenuCategory } from "@/types";

type PartnerMenuCategoriesItemProps = {
  menuCategory: MenuCategory;
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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <IconButton {...listeners} size="small" sx={{ cursor: "move" }}>
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
