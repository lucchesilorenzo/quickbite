import { useState } from "react";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PreviewIcon from "@mui/icons-material/Preview";
import {
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { Controller, useFormContext } from "react-hook-form";

import PreviewImageDialog from "./PreviewImageDialog";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import VisuallyHiddenInput from "@/components/common/VisuallyHiddenInput";
import { usePartnerRestaurantSettingsInfo } from "@/hooks/contexts/usePartnerRestaurantSettingsInfo";
import { TPartnerRestaurantSettingsInfoFormSchema } from "@/validations/partner-restaurant-settings-validations";

export default function PartnerSettingsInfoMainFormSection() {
  const { editMode } = usePartnerRestaurantSettingsInfo();

  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<TPartnerRestaurantSettingsInfoFormSchema>();

  const [openPreviewImageDialog, setOpenPreviewImageDialog] = useState(false);
  const [previewImageFile, setPreviewImageFile] = useState<File | null>(null);

  const logo = watch("logo");
  const cover = watch("cover");

  function handlePreviewImage(fileList?: FileList | string) {
    if (fileList && fileList.length > 0 && fileList instanceof FileList) {
      const file = fileList[0];

      setPreviewImageFile(file);
      setOpenPreviewImageDialog(true);
    }
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

      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="filled"
              autoComplete="off"
              required
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

      <Stack direction="row" spacing={2}>
        <Stack direction="row" spacing={1}>
          <Controller
            name="logo"
            control={control}
            render={({ field }) => (
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                disabled={!editMode}
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
            <IconButton
              disabled={!editMode || !logo || !logo.length}
              onClick={() => handlePreviewImage(logo)}
            >
              <PreviewIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <Divider orientation="vertical" flexItem />

        <Stack direction="row" spacing={1}>
          <Controller
            name="cover"
            control={control}
            render={({ field }) => (
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                disabled={!editMode}
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
            <IconButton
              disabled={!editMode || !cover || !cover.length}
              onClick={() => handlePreviewImage(cover)}
            >
              <PreviewIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <PreviewImageDialog
        openPreviewImageDialog={openPreviewImageDialog}
        setOpenPreviewImageDialog={setOpenPreviewImageDialog}
        image={previewImageFile}
      />
    </Stack>
  );
}
