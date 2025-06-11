import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Box,
  Divider,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function RatingDisplay() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { restaurant } = useSingleRestaurant();

  return (
    <Box sx={{ p: 2, bgcolor: blueGrey[800] }}>
      <Typography
        component="h2"
        variant={isMobile ? "h6" : "h5"}
        gutterBottom
        sx={{ color: "white", fontWeight: 700 }}
      >
        Overall score
      </Typography>

      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Typography
          component="div"
          variant={isMobile ? "h4" : "h3"}
          sx={{ color: "white", fontWeight: 700 }}
        >
          {restaurant.reviews_avg_rating}
        </Typography>

        <Divider orientation="vertical" flexItem sx={{ bgcolor: grey[600] }} />

        <Stack spacing={1}>
          <Rating
            value={restaurant.reviews_avg_rating}
            icon={<StarIcon color="primary" />}
            emptyIcon={<StarBorderIcon color="primary" />}
            readOnly
          />

          <Typography component="div" variant="caption" sx={{ color: "white" }}>
            out of {restaurant.reviews_count} reviews
          </Typography>

          <Typography component="div" variant="caption" sx={{ color: "white" }}>
            All reviews come from QuickBite customers who have ordered from{" "}
            {restaurant.name}.{" "}
            <Typography
              component={Link}
              variant="caption"
              to="/how-do-i-leave-a-review"
              sx={{ color: "white", "&:hover": { textDecoration: "none" } }}
            >
              Find out more
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
