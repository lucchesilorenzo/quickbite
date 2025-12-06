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
import { useUpdateJobPost } from "@partner/hooks/restaurants/job-posts/useUpdateJobPost";
import {
  employmentTypes,
  jobPostStatuses,
} from "@partner/lib/constants/job-posts";
import {
  TEditJobPostFormSchema,
  editJobPostFormSchema,
} from "@partner/schemas/job-posts.schema";
import { GetJobPostResponse } from "@partner/types/job-posts/job-post.api-types";
import { Controller, useForm } from "react-hook-form";

import JobPostEditor from "../job-description-editor/JobPostEditor";

import FormHelperTextError from "@/components/common/FormHelperTextError";

type EditJobPostFormProps = {
  jobPost?: GetJobPostResponse;
  setOpenEditJobPostDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditJobPostForm({
  jobPost,
  setOpenEditJobPostDialog,
}: EditJobPostFormProps) {
  const { restaurant } = useRestaurant();

  const { mutate: updateJobPost, isPending: isUpdating } = useUpdateJobPost({
    restaurantId: restaurant.id,
    jobPostId: jobPost?.id,
    setOpenEditJobPostDialog,
  });

  const {
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(editJobPostFormSchema),
    defaultValues: {
      title: jobPost?.title || "",
      description_html: jobPost?.description_html || "",
      description_text: jobPost?.description_text || "",
      employment_type: jobPost?.employment_type || "",
      salary: jobPost?.salary?.toString() || "",
      status: jobPost?.status || "",
    },
  });

  function onSubmit(data: TEditJobPostFormSchema) {
    updateJobPost(data);
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

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.status} required>
              <InputLabel id="status-label">Status</InputLabel>

              <Select
                {...field}
                labelId="status-label"
                id="status"
                label="Status"
              >
                {jobPostStatuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>

              <Box sx={{ mt: 1 }}>
                {errors.status?.message && (
                  <FormHelperTextError message={errors.status.message} />
                )}
              </Box>
            </FormControl>
          )}
        />
      </Stack>

      <Button
        type="submit"
        loading={isSubmitting || isUpdating}
        loadingIndicator="Editing..."
        variant="contained"
      >
        Edit job post
      </Button>
    </Stack>
  );
}
