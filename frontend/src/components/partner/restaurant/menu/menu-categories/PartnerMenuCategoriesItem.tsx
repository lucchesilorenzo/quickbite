import { useState } from "react";

import { Chip } from "@mui/material";

import { MenuCategory } from "@/types";

type PartnerMenuCategoriesItemProps = {
  category: MenuCategory;
};

export default function PartnerMenuCategoriesItem({
  category,
}: PartnerMenuCategoriesItemProps) {
  const [openEditMenuCategoryDialog, setOpenEditMenuCategoryDialog] =
    useState(false);
  const [openDeleteMenuCategoryDialog, setOpenDeleteMenuCategoryDialog] =
    useState(false);

  return (
    <>
      <Chip
        label={category.name}
        onClick={() => setOpenEditMenuCategoryDialog(true)}
        onDelete={() => setOpenDeleteMenuCategoryDialog(true)}
      />
    </>
  );
}
