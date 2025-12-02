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
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useCreateJobPost } from "@partner/hooks/restaurants/job-posts/useCreateJobPost";
import { employmentTypes } from "@partner/lib/constants/job-posts";
import { Controller, useForm } from "react-hook-form";

import JobPostEditor from "../job-description-editor/JobPostEditor";

import FormHelperTextError from "@/components/common/FormHelperTextError";
import {
  TAddJobPostFormSchema,
  addJobPostFormSchema,
} from "@/features/private/partner/schemas/job-posts.schema";

type AddJobPostFormProps = {
  setOpenAddJobPostDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddJobPostForm({
  setOpenAddJobPostDialog,
}: AddJobPostFormProps) {
  const { restaurant } = useRestaurant();

  const { mutate: createJobPost, isPending: isCreating } = useCreateJobPost({
    restaurantId: restaurant.id,
    setOpenAddJobPostDialog,
  });

  const {
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(addJobPostFormSchema),
    defaultValues: {
      title: "",
      description_html: "",
      description_text: "",
      employment_type: "",
      salary: "",
    },
  });

  function onSubmit(data: TAddJobPostFormSchema) {
    createJobPost(data);
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
          name="description_html"
          control={control}
          render={({ field }) => (
            <JobPostEditor
              value={field.value}
              onChange={field.onChange}
              descriptionError={errors.description_text?.message}
              setValue={setValue}
            />
          )}
        />

        <Controller
          name="employment_type"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.employment_type} required>
              <InputLabel id="employment-type-label">
                Employment type
              </InputLabel>

              <Select
                {...field}
                labelId="employment-type-label"
                id="employment-type"
                label="Employment type"
              >
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
        loading={isSubmitting || isCreating}
        loadingIndicator="Adding..."
        variant="contained"
      >
        Add job post
      </Button>
    </Stack>
  );
}
