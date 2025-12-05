import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useCreateMenuCategory } from "@partner/hooks/restaurants/menu/categories/useCreateMenuCategory";
import {
  TAddMenuCategoryFormSchema,
  addMenuCategoryFormSchema,
} from "@partner/schemas/menu.schema";
import { Controller, useForm } from "react-hook-form";

import FormHelperTextError from "@/components/common/FormHelperTextError";

type AddMenuCategoryFormProps = {
  setOpenAddMenuCategoryDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddMenuCategoryForm({
  setOpenAddMenuCategoryDialog,
}: AddMenuCategoryFormProps) {
  const { restaurant } = useRestaurant();

  const { mutateAsync: createMenuCategory } = useCreateMenuCategory({
    restaurantId: restaurant.id,
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(addMenuCategoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(data: TAddMenuCategoryFormSchema) {
    await createMenuCategory(data);
    setOpenAddMenuCategoryDialog(false);
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
