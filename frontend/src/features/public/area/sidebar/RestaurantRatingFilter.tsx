import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Rating, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const ratings: Record<number, string> = {
  1: "one_star",
  2: "two_stars",
  3: "three_stars",
  4: "four_stars",
  5: "five_stars",
};

export default function RestaurantRatingFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilters = searchParams.getAll("filter");
  const ratingFilter = currentFilters.find((f) =>
    Object.values(ratings).includes(f),
  );

  const rating =
    (ratingFilter &&
      Number(
        Object.keys(ratings).find((k) => ratings[Number(k)] === ratingFilter),
      )) ||
    null;

  function handleRatingChange(_e: React.SyntheticEvent, value: number | null) {
    const currentMOV = searchParams.getAll("mov");
    const currentSort = searchParams.getAll("sort_by");
    const currentViewType = searchParams.getAll("view_type");
    const currentSearchTerm = searchParams.getAll("q");

    // Take all the filters that are not rating filters
    const updatedFilters = currentFilters.filter(
      (f) => !Object.values(ratings).includes(f),
    );

    // If rating is null, remove it from the query params
    if (!value) {
      setSearchParams({
        lat: searchParams.getAll("lat"),
        lon: searchParams.getAll("lon"),
        filter: updatedFilters,
        mov: currentMOV,
        sort_by: currentSort,
        view_type: currentViewType,
        q: currentSearchTerm,
      });

      return;
    }

    // If rating is not null, add it to the query params
    setSearchParams({
      lat: searchParams.getAll("lat"),
      lon: searchParams.getAll("lon"),
      filter: [...updatedFilters, ratings[value]],
      mov: currentMOV,
      sort_by: currentSort,
      view_type: currentViewType,
      q: currentSearchTerm,
    });
  }

  return (
    <Stack spacing={1}>
      <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
        Rating
      </Typography>

      <Rating
        value={rating}
        onChange={handleRatingChange}
        icon={<StarIcon color="primary" fontSize="large" />}
        emptyIcon={<StarBorderIcon color="primary" fontSize="large" />}
      />
    </Stack>
  );
}
