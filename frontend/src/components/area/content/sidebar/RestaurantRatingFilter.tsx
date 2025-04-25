import { useEffect, useState } from "react";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Rating, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const ratings: Record<number, string> = {
  1: "one_star",
  2: "two_star",
  3: "three_star",
  4: "four_star",
  5: "five_star",
};

export default function RestaurantRatingFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rating, setRating] = useState<number | null>(null);
  console.log(rating);

  function handleRatingChange(_e: React.SyntheticEvent, value: number | null) {
    // Update query params
    const currentFilters = searchParams.getAll("filter");
    const currentMOV = searchParams.get("mov");

    // Take all the filters that are not rating filters
    const updatedFilters = currentFilters.filter(
      (f) => !Object.values(ratings).includes(f),
    );

    // If rating is null, remove it from the query params
    if (!value) {
      if (!currentMOV) {
        setSearchParams({ filter: updatedFilters });
      } else {
        setSearchParams({ filter: updatedFilters, mov: currentMOV });
      }

      setRating(null);
      return;
    }

    // If rating is not null, add it to the query params
    if (!currentMOV) {
      setSearchParams({ filter: [...updatedFilters, ratings[value]] });
    } else {
      setSearchParams({
        filter: [...updatedFilters, ratings[value]],
        mov: currentMOV,
      });

      setRating(value);
    }
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
