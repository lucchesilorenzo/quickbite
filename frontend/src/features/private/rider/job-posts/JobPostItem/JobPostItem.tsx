import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { employmentTypes } from "@private/shared/lib/constants/job-posts";
import { JobPostWithRestaurant } from "@rider/types/job-posts/job-post.types";

import { formatCurrency } from "@/lib/utils/formatting";

type JobPostItemProps = {
  jobPost: JobPostWithRestaurant;
};

export default function JobPostItem({ jobPost }: JobPostItemProps) {
  const employmentType = employmentTypes.find(
    (option) => option.value === jobPost.employment_type,
  )?.label;

  return (
    <Card variant="outlined">
      <CardActionArea>
        <CardContent sx={{ p: 2 }}>
          <Chip
            color="info"
            label="New job post"
            size="small"
            sx={{ fontWeight: 500 }}
          />

          <Typography variant="h6" component="div" sx={{ mt: 1 }}>
            {jobPost.title}
          </Typography>

          <Box sx={{ mt: 1 }}>
            <Typography color="textSecondary" variant="body2" component="div">
              {jobPost.restaurant.name}
            </Typography>

            <Typography color="textSecondary" variant="body2" component="div">
              {jobPost.restaurant.postcode} - {jobPost.restaurant.city}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            {jobPost.salary && (
              <Chip
                label={`${formatCurrency(jobPost.salary)} / year`}
                size="small"
                sx={{ fontWeight: 500 }}
              />
            )}

            <Chip
              color="success"
              label={employmentType}
              size="small"
              icon={<CheckIcon />}
              sx={{ fontWeight: 500 }}
            />
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 1, alignItems: "center" }}
          >
            <SendIcon color="info" fontSize="small" />

            <Typography color="textSecondary" variant="body2" component="div">
              Apply now
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
