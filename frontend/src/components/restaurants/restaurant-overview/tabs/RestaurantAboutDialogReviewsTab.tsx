import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function RestaurantAboutDialogReviewsTab() {
  return (
    <Box>
      <Box sx={{ p: 2, bgcolor: blueGrey[800] }}>
        <Typography
          component="h2"
          variant="h5"
          gutterBottom
          sx={{ color: "white", fontWeight: 700 }}
        >
          Overall score
        </Typography>

        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Typography
            component="div"
            variant="h3"
            sx={{ color: "white", fontWeight: 700 }}
          >
            2.9
          </Typography>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ bgcolor: grey[600] }}
          />

          <Stack spacing={1}>
            <Rating
              value={2.9}
              icon={<StarIcon color="primary" />}
              emptyIcon={<StarBorderIcon color="primary" />}
              readOnly
            />

            <Typography
              component="div"
              variant="caption"
              sx={{ color: "white" }}
            >
              out of 640+ reviews
            </Typography>

            <Typography
              component="div"
              variant="caption"
              sx={{ color: "white" }}
            >
              All reviews come from Just Eat customers who have ordered from
              McDonald's® - Strand.{" "}
              <Typography
                component={Link}
                variant="caption"
                to="/"
                sx={{ color: "white", "&:hover": { textDecoration: "none" } }}
              >
                Find out more
              </Typography>
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ py: 2, px: 3 }}>
        <Typography
          component="h2"
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                Mark
              </Typography>

              <Typography variant="body2" sx={{ fontWeight: 500, mb: 2 }}>
                {format(new Date(), "EEEE dd MMM yyyy")}
              </Typography>

              <Rating
                value={1}
                icon={<StarIcon color="primary" />}
                emptyIcon={<StarBorderIcon color="primary" />}
                readOnly
                sx={{ mb: 2 }}
              />

              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontWeight: 600 }}
              >
                my food hasn't turned up
              </Typography>
            </CardContent>
          </Card>
        </Typography>
      </Box>
    </Box>
  );
}
