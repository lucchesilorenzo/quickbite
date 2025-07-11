import { zodResolver } from "@hookform/resolvers/zod";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Button, Rating, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { FormHelperTextError } from "@/components/common/FormHelperTextError";
import { useCreateReview } from "@/hooks/react-query/private/customers/useCreateReview";
import { Order } from "@/types/order-types";
import { TReviewForm, reviewForm } from "@/validations/review-validations";

type AddReviewFormProps = {
  setOpenAddReviewDialog: React.Dispatch<React.SetStateAction<boolean>>;
  order: Order;
};

export default function AddReviewForm({
  setOpenAddReviewDialog,
  order,
}: AddReviewFormProps) {
  const { mutateAsync: createReview } = useCreateReview(order.restaurant.slug);

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
    await createReview({ ...data, order_id: order.id });
    setOpenAddReviewDialog(false);
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
            label="Add a comment (optional)"
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
