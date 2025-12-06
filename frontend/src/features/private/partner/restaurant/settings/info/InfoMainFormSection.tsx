import { useState } from "react";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PreviewIcon from "@mui/icons-material/Preview";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useInfo } from "@partner/restaurant/settings/contexts/InfoProvider";
import { TRestaurantSettingsInfoFormSchema } from "@partner/schemas/restaurant-settings.schema";
import { MuiTelInput } from "mui-tel-input";
import { Controller, useFormContext } from "react-hook-form";

import PreviewImageDialog from "./PreviewImageDialog";

import FormHelperTextError from "@/components/common/FormHelperTextError";
import VisuallyHiddenInput from "@/components/common/VisuallyHiddenInput";
import { useCategoryFilters } from "@/contexts/CategoryFiltersProvider";
import env from "@/lib/env";

export default function InfoMainFormSection() {
  const { allCategories } = useCategoryFilters();
  const { editMode } = useInfo();

  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<TRestaurantSettingsInfoFormSchema>();

  const [openPreviewImageDialog, setOpenPreviewImageDialog] = useState(false);
  const [previewImageFile, setPreviewImageFile] = useState<
    File | string | null
  >(null);

  const logo = watch("logo");
  const cover = watch("cover");

  function handlePreviewImage(fileOrPath?: FileList | string | null) {
    if (fileOrPath && fileOrPath instanceof FileList && fileOrPath.length > 0) {
      setPreviewImageFile(fileOrPath[0]);
    } else if (typeof fileOrPath === "string") {
      setPreviewImageFile(`${env.VITE_BASE_URL}${fileOrPath}`);
    }

    setOpenPreviewImageDialog(true);
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
    <Stack spacing={2}>
      <Typography variant="h6">Main info</Typography>

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            variant="filled"
            autoComplete="off"
            label="Business name"
            error={!!errors.name}
            helperText={
              errors.name?.message && (
                <FormHelperTextError message={errors.name.message} />
              )
            }
            fullWidth
            sx={{ minWidth: 150 }}
            slotProps={{
              input: {
                readOnly: !editMode,
              },
            }}
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
            maxRows={5}
            variant="filled"
            autoComplete="off"
            label="Description"
            error={!!errors.description}
            helperText={
              errors.description?.message && (
                <FormHelperTextError message={errors.description.message} />
              )
            }
            fullWidth
            sx={{ minWidth: 150 }}
            slotProps={{
              input: {
                readOnly: !editMode,
              },
            }}
          />
        )}
      />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ alignItems: "center" }}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              variant="filled"
              autoComplete="off"
              label="Email address"
              error={!!errors.email}
              helperText={
                errors.email?.message && (
                  <FormHelperTextError message={errors.email.message} />
                )
              }
              fullWidth
              sx={{ minWidth: 150 }}
              slotProps={{
                input: {
                  readOnly: !editMode,
                },
              }}
            />
          )}
        />

        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <MuiTelInput
              {...field}
              required
              variant="filled"
              label="Phone number"
              defaultCountry="IT"
              onlyCountries={["IT"]}
              forceCallingCode
              disableDropdown
              error={!!errors.phone_number}
              helperText={
                errors.phone_number?.message && (
                  <FormHelperTextError message={errors.phone_number.message} />
                )
              }
              fullWidth
              sx={{ minWidth: 150 }}
              slotProps={{
                input: {
                  readOnly: !editMode,
                },
              }}
            />
          )}
        />
      </Stack>

      <Controller
        name="categories"
        control={control}
        render={({ field }) => (
          <Autocomplete
            multiple
            value={allCategories.filter((c) => field.value.includes(c.id))}
            onChange={(_, value) => field.onChange(value.map((c) => c.id))}
            readOnly={!editMode}
            options={allCategories}
            getOptionLabel={(option) => option.name}
            slotProps={{
              listbox: {
                sx: {
                  maxHeight: 250,
                },
              },
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option.id}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Categories"
                placeholder="Select categories"
                variant="filled"
                error={!!errors.categories}
                helperText={
                  errors.categories?.message && (
                    <FormHelperTextError message={errors.categories.message} />
                  )
                }
              />
            )}
          />
        )}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Stack direction="row" spacing={1}>
          <Controller
            name="logo"
            control={control}
            render={({ field }) => (
              <Button
                component="label"
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                disabled={!editMode}
                sx={{ flex: 1 }}
              >
                Upload logo
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, field.onChange)}
                />
              </Button>
            )}
          />

          <Tooltip title="Preview">
            <Box component="span">
              <IconButton
                disabled={!editMode || !logo || !logo.length}
                onClick={() => handlePreviewImage(logo)}
              >
                <PreviewIcon />
              </IconButton>
            </Box>
          </Tooltip>
        </Stack>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", sm: "block" } }}
        />

        <Stack direction="row" spacing={1}>
          <Controller
            name="cover"
            control={control}
            render={({ field }) => (
              <Button
                component="label"
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                disabled={!editMode}
                sx={{ flex: 1 }}
              >
                Upload cover
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, field.onChange)}
                />
              </Button>
            )}
          />

          <Tooltip title="Preview">
            <Box component="span">
              <IconButton
                disabled={!editMode || !cover || !cover.length}
                onClick={() => handlePreviewImage(cover)}
              >
                <PreviewIcon />
              </IconButton>
            </Box>
          </Tooltip>
        </Stack>
      </Stack>

      <PreviewImageDialog
        openPreviewImageDialog={openPreviewImageDialog}
        image={previewImageFile}
        setOpenPreviewImageDialog={setOpenPreviewImageDialog}
      />
    </Stack>
  );
}
