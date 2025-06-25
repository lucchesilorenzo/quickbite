import { zodResolver } from "@hookform/resolvers/zod";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Button, Rating, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { useCreateReview } from "@/hooks/react-query/private/customers/useCreateReview";
import { RestaurantBase } from "@/types";
import { TReviewForm, reviewForm } from "@/validations/review-validations";

type AddReviewFormProps = {
  setOpenAddReviewDialog: React.Dispatch<React.SetStateAction<boolean>>;
  restaurant: RestaurantBase;
};

export default function AddReviewForm({
  setOpenAddReviewDialog,
  restaurant,
}: AddReviewFormProps) {
  const { mutateAsync: createReview } = useCreateReview(restaurant.slug);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(reviewForm),
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  async function onSubmit(data: TReviewForm) {
    await createReview(data);

    setOpenAddReviewDialog(false);
    navigate(`/restaurants/${restaurant.slug}`);
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
        name="comment"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            multiline
            autoComplete="off"
            label="Add a review (optional)"
            placeholder="Your review will be shared with the restaurant and other customers."
            maxRows={4}
            error={!!errors.comment}
            helperText={
              errors.comment?.message && (
                <FormHelperTextError message={errors.comment.message} />
              )
            }
            fullWidth
            sx={{ minWidth: 150 }}
          />
        )}
      />

      <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <Stack spacing={1}>
            <Typography variant="body1">Rate your experience</Typography>

            <Rating
              value={field.value}
              onChange={(_, value) => field.onChange(value)}
              icon={<StarIcon color="primary" fontSize="large" />}
              emptyIcon={<StarBorderIcon color="primary" fontSize="large" />}
            />

            {errors.rating?.message && (
              <FormHelperTextError message={errors.rating.message} />
            )}
          </Stack>
        )}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
        loadingIndicator="Saving..."
        variant="contained"
      >
        Save
      </Button>
    </Stack>
  );
}
