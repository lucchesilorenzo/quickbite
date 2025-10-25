import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { useUpdateMenuCategory } from "@partner/hooks/restaurants/menu/categories/useUpdateMenuCategory";
import { PartnerMenu } from "@partner/types/menu-types";
import {
  TEditMenuCategoryFormSchema,
  editMenuCategoryFormSchema,
} from "@partner/validations/menu-validations";
import { useRestaurant } from "@private/partner/contexts/RestaurantProvider";
import { Controller, useForm } from "react-hook-form";

import FormHelperTextError from "@/components/FormHelperTextError";

type EditMenuCategoryFormProps = {
  menuCategory: PartnerMenu;
  setOpenEditMenuCategoryDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditMenuCategoryForm({
  menuCategory,
  setOpenEditMenuCategoryDialog,
}: EditMenuCategoryFormProps) {
  const { restaurant } = useRestaurant();

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
        loading={isSubmitting}
        loadingIndicator="Saving..."
        variant="contained"
      >
        Save
      </Button>
    </Stack>
  );
}
