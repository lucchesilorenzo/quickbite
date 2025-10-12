import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { usePartnerRestaurant } from "@/contexts/private/partner/PartnerRestaurantProvider";
import { useUpdateMenuCategory } from "@/hooks/react-query/private/partner/restaurants/menu/categories/useUpdateMenuCategory";
import { PartnerMenu } from "@/types";
import {
  TEditMenuCategoryFormSchema,
  editMenuCategoryFormSchema,
} from "@/validations/private/partner/menu-validations";

type EditMenuCategoryFormProps = {
  menuCategory: PartnerMenu;
  setOpenEditMenuCategoryDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditMenuCategoryForm({
  menuCategory,
  setOpenEditMenuCategoryDialog,
}: EditMenuCategoryFormProps) {
  const { restaurant } = usePartnerRestaurant();

  const { mutateAsync: updateMenuCategory } = useUpdateMenuCategory(
    restaurant.id,
    menuCategory.id,
  );

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(editMenuCategoryFormSchema),
    defaultValues: {
      name: menuCategory.name || "",
      description: menuCategory.description || "",
    },
  });

  async function onSubmit(data: TEditMenuCategoryFormSchema) {
    await updateMenuCategory(data);
    setOpenEditMenuCategoryDialog(false);
  }

  return (
    <Stack
      component="form"
      autoComplete="off"
      noValidate
      spacing={4}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Name"
            placeholder="Enter menu category name"
            error={!!errors.name}
            helperText={
              errors.name?.message && (
                <FormHelperTextError message={errors.name.message} />
              )
            }
            fullWidth
            sx={{ minWidth: 150 }}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            multiline
            minRows={3}
            label="Description"
            placeholder="Enter menu category description"
            error={!!errors.description}
            helperText={
              errors.description?.message && (
                <FormHelperTextError message={errors.description.message} />
              )
            }
            fullWidth
            sx={{ minWidth: 150 }}
          />
        )}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
        loadingIndicator="Saving..."
        variant="contained"
      >
        Save
      </Button>
    </Stack>
  );
}
