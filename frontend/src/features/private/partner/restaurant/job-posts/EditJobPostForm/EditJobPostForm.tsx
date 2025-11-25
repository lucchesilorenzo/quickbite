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
import { employmentTypes } from "@partner/lib/constants/job-posts";
import {
  GetJobPostResponse,
  UpdateJobPostPayload,
} from "@partner/types/job-posts/job-posts.api-types";
import {
  TEditJobPostFormSchema,
  editJobPostFormSchema,
} from "@partner/validations/job-posts-validations";
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

  // const { mutate: updateJobPost, isPending: isUpdating } = useUpdateJobPost(
  //   restaurant.id,
  //   setOpenEditJobPostDialog,
  // );

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(editJobPostFormSchema),
    defaultValues: {
      title: jobPost?.title || "",
      description: { html: jobPost?.description || "", text: "" },
      employment_type: jobPost?.employment_type || "",
      salary: jobPost?.salary?.toString() || "",
    },
  });

  function onSubmit(data: TEditJobPostFormSchema) {
    const payload: UpdateJobPostPayload = {
      ...data,
      description: data.description.html,
    };

    // updateJobPost(payload);
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
            <JobPostEditor
              value={field.value.html}
              onChange={field.onChange}
              descriptionError={errors.description?.text?.message}
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
        loading={isSubmitting}
        loadingIndicator="Editing..."
        variant="contained"
      >
        Edit job post
      </Button>
    </Stack>
  );
}
