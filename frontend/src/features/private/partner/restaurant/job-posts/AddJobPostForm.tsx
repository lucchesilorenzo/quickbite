import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { employmentTypes } from "@partner/lib/constants/job-posts";
import {
  TAddJobPostFormSchema,
  addJobPostFormSchema,
} from "@partner/validations/job-posts-validations";
import { useRestaurant } from "@private/partner/contexts/RestaurantProvider";
import { Controller, useForm } from "react-hook-form";

import JobPostEditor from "./job-description-editor/JobPostEditor";

import FormHelperTextError from "@/components/common/FormHelperTextError";

type AddJobPostFormProps = {
  setOpenAddJobPostDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddJobPostForm({
  setOpenAddJobPostDialog,
}: AddJobPostFormProps) {
  const { restaurant } = useRestaurant();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(addJobPostFormSchema),
    defaultValues: {
      title: "",
      description: "",
      employment_type: "",
      salary: "",
    },
  });

  async function onSubmit(data: TAddJobPostFormSchema) {
    setOpenAddJobPostDialog(false);
  }

  return (
    <Stack
      component="form"
      autoComplete="off"
      noValidate
      spacing={4}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={2}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="Title"
              placeholder="Enter title"
              error={!!errors.title}
              helperText={
                errors.title?.message && (
                  <FormHelperTextError message={errors.title.message} />
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
            <Box>
              <JobPostEditor value={field.value} onChange={field.onChange} />

              <Box sx={{ mt: 1 }}>
                {errors.description?.message && (
                  <FormHelperTextError message={errors.description.message} />
                )}
              </Box>
            </Box>
          )}
        />

        <Controller
          name="employment_type"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.employment_type} required>
              <InputLabel>Employment type</InputLabel>

              <Select {...field} label="Employment type">
                {employmentTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>

              <Box sx={{ mt: 1 }}>
                {errors.employment_type?.message && (
                  <FormHelperTextError
                    message={errors.employment_type.message}
                  />
                )}
              </Box>
            </FormControl>
          )}
        />

        <Controller
          name="salary"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="Salary"
              placeholder="Enter salary"
              error={!!errors.salary}
              helperText={
                errors.salary?.message && (
                  <FormHelperTextError message={errors.salary.message} />
                )
              }
              fullWidth
              sx={{ minWidth: 150 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
      </Stack>

      <Button
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
        loadingIndicator="Adding..."
        variant="contained"
      >
        Add job post
      </Button>
    </Stack>
  );
}
