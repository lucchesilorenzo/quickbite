import { zodResolver } from "@hookform/resolvers/zod";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import { useCreateMenuItem } from "@partner/hooks/restaurants/menu/items/useCreateMenuItem";
import {
  TAddMenuItemFormSchema,
  addMenuItemFormSchema,
} from "@partner/validations/menu-validations";
import { useMenu } from "@private/partner/contexts/MenuProvider";
import { useRestaurant } from "@private/partner/contexts/RestaurantProvider";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/FormHelperTextError";
import VisuallyHiddenInput from "@/components/VisuallyHiddenInput";

type AddMenuItemFormProps = {
  setOpenAddMenuItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddMenuItemForm({
  setOpenAddMenuItemDialog,
}: AddMenuItemFormProps) {
  const { restaurant } = useRestaurant();
  const { selectedMenuCategoryId } = useMenu();

  const { mutateAsync: createMenuItem } = useCreateMenuItem(
    restaurant.id,
    selectedMenuCategoryId,
  );

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(addMenuItemFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: null,
    },
  });

  async function onSubmit(data: TAddMenuItemFormSchema) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    if (data.image) formData.append("image", data.image[0]);

    await createMenuItem(formData);
    setOpenAddMenuItemDialog(false);
  }

  function handleFileUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (value: FileList) => void,
  ) {
    if (e.target.files && e.target.files.length > 0) {
      fieldOnChange(e.target.files);
    }
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
            placeholder="Enter menu item name"
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
            rows={4}
            label="Description"
            placeholder="Enter menu item description"
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

      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Price"
            placeholder="Enter menu item price"
            error={!!errors.price}
            helperText={
              errors.price?.message && (
                <FormHelperTextError message={errors.price.message} />
              )
            }
            fullWidth
            sx={{ minWidth: 150 }}
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              },
            }}
          />
        )}
      />

      <Box>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <Button
              component="label"
              variant="text"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload image
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, field.onChange)}
              />
            </Button>
          )}
        />
      </Box>

      <Button
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
        loadingIndicator="Adding..."
        variant="contained"
      >
        Add menu item
      </Button>
    </Stack>
  );
}
