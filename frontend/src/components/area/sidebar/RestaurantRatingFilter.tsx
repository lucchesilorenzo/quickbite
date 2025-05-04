import { useEffect, useState } from "react";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Rating, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { ratings } from "@/lib/data";

export default function RestaurantRatingFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rating, setRating] = useState<number | null>(null);

  function handleRatingChange(_e: React.SyntheticEvent, value: number | null) {
    // Update query params
    const currentFilters = searchParams.getAll("filter");
    const currentMOV = searchParams.getAll("mov");
    const currentSort = searchParams.getAll("sort_by");
    const currentViewType = searchParams.getAll("view_type");

    // Take all the filters that are not rating filters
    const updatedFilters = currentFilters.filter(
      (f) => !Object.values(ratings).includes(f),
    );

    // If rating is null, remove it from the query params
    if (!value) {
      setSearchParams({
        filter: updatedFilters,
        mov: currentMOV,
        sort_by: currentSort,
        view_type: currentViewType,
      });

      setRating(null);
      return;
    }

    // If rating is not null, add it to the query params
    setSearchParams({
      filter: [...updatedFilters, ratings[value]],
      mov: currentMOV,
      sort_by: currentSort,
      view_type: currentViewType,
    });

    setRating(value);
  }

  useEffect(() => {
    const currentFilters = searchParams.getAll("filter");

    // Check if there is a rating filter
    const ratingFilter = currentFilters.find((f) =>
      Object.values(ratings).includes(f),
    );

    if (!ratingFilter) {
      setRating(null);
      return;
    }

    // Get the key of the rating filter
    const ratingKey = Object.entries(ratings).find(
      ([, value]) => value === ratingFilter,
    )?.[0];

    if (ratingKey) setRating(Number(ratingKey));
  }, [searchParams]);

  return (
    <Stack spacing={1}>
      <Typography variant="h6" component="span" sx={{ fontWeight: "700" }}>
        Rating
      </Typography>

      <Rating
        name="rating"
        value={rating}
        onChange={handleRatingChange}
        icon={<StarIcon color="primary" fontSize="large" />}
        emptyIcon={<StarBorderIcon color="primary" fontSize="large" />}
      />
    </Stack>
  );
}
