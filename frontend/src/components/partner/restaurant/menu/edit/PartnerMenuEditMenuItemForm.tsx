import { zodResolver } from "@hookform/resolvers/zod";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import AntSwitch from "@/components/common/AntSwitch";
import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import VisuallyHiddenInput from "@/components/common/VisuallyHiddenInput";
import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import { useUpdatePartnerRestaurantMenuItem } from "@/hooks/react-query/private/partners/restaurants/useUpdatePartnerRestaurantMenuItem";
import { MenuItem } from "@/types";
import {
  TPartnerRestaurantMenuEditMenuItemFormSchema,
  partnerRestaurantMenuEditMenuItemFormSchema,
} from "@/validations/partner-restaurant-menu-validations";

type PartnerMenuEditMenuItemFormProps = {
  menuItem: MenuItem;
  setOpenEditMenuItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PartnerMenuEditMenuItemForm({
  menuItem,
  setOpenEditMenuItemDialog,
}: PartnerMenuEditMenuItemFormProps) {
  const { restaurant } = usePartnerRestaurant();

  const { mutateAsync: updatePartnerRestaurantMenuItem } =
    useUpdatePartnerRestaurantMenuItem(restaurant.id, menuItem.id);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(partnerRestaurantMenuEditMenuItemFormSchema),
    defaultValues: {
      name: menuItem.name,
      description: menuItem.description || "",
      price: menuItem.price,
      image: null,
      is_available: menuItem.is_available,
    },
  });

  async function onSubmit(data: TPartnerRestaurantMenuEditMenuItemFormSchema) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    if (data.image) formData.append("image", data.image[0]);
    formData.append("is_available", data.is_available ? "1" : "0");

    await updatePartnerRestaurantMenuItem(formData);
    setOpenEditMenuItemDialog(false);
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

      <Controller
        name="is_available"
        control={control}
        render={({ field }) => (
          <FormControl error={!!errors.is_available}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Is {menuItem.name} still available?
            </Typography>

            <Stack direction="row" spacing={1}>
              <Typography variant="body2">Yes/No</Typography>

              <AntSwitch
                {...field}
                checked={field.value}
                onChange={field.onChange}
              />
            </Stack>

            {errors.is_available?.message && (
              <FormHelperTextError message={errors.is_available.message} />
            )}
          </FormControl>
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
        loadingIndicator="Editing..."
        variant="contained"
      >
        Edit menu item
      </Button>
    </Stack>
  );
}
