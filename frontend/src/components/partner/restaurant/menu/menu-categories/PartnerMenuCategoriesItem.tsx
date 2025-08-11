import { useState } from "react";

import { Chip } from "@mui/material";

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

  return (
    <>
      <Chip
        label={menuCategory.name}
        onClick={() => setOpenEditMenuCategoryDialog(true)}
        onDelete={() => setOpenDeleteMenuCategoryDialog(true)}
      />

      <PartnerMenuCategoriesEditMenuCategoryDialog
        menuCategory={menuCategory}
        openEditMenuCategoryDialog={openEditMenuCategoryDialog}
        setOpenEditMenuCategoryDialog={setOpenEditMenuCategoryDialog}
      />
    </>
  );
}
