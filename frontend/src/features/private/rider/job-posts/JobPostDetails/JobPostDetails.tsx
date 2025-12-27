import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CheckIcon from "@mui/icons-material/Check";
import PaymentsIcon from "@mui/icons-material/Payments";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { employmentTypes } from "@private/shared/lib/constants/job-posts";
import { JobPostWithRestaurant } from "@rider/types/job-posts/job-post.types";

import JobPostDescription from "../JobPostDescription";

import { formatCurrency } from "@/lib/utils/formatting";

type JobPostDetailsProps = {
  jobPost?: JobPostWithRestaurant;
};

export default function JobPostDetails({ jobPost }: JobPostDetailsProps) {
  const employmentType = employmentTypes.find(
    (option) => option.value === jobPost?.employment_type,
  )?.label;

  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <Typography variant="h5" sx={{ my: 1, fontWeight: 500 }}>
            {jobPost?.title}
          </Typography>
        }
        subheader={
          <Box>
            <Typography variant="body2">{jobPost?.restaurant.name}</Typography>

            <Typography variant="body2" color="textSecondary" gutterBottom>
              {jobPost?.restaurant.postcode} - {jobPost?.restaurant.city}
            </Typography>

            {jobPost?.salary && (
              <Typography variant="body1" color="textPrimary" gutterBottom>
                {formatCurrency(jobPost.salary)} / year
              </Typography>
            )}

            <Button variant="contained" color="info">
              Apply now
            </Button>
          </Box>
        }
      />

      <Divider />

      <Box sx={{ maxHeight: 600, overflowY: "auto" }}>
        <CardContent>
          <Box>
            <Typography variant="h6" gutterBottom>
              Job post details
            </Typography>

            <Stack spacing={4}>
              <Stack direction="row" spacing={1}>
                <PaymentsIcon fontSize="inherit" />

                {jobPost?.salary && (
                  <Stack spacing={1}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Salary
                    </Typography>

                    <Chip
                      icon={<CheckIcon />}
                      color="success"
                      label={`${formatCurrency(jobPost.salary)} / year`}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </Stack>
                )}
              </Stack>

              <Stack direction="row" spacing={1}>
                <BusinessCenterIcon fontSize="inherit" />

                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Employment type
                  </Typography>

                  <Chip
                    icon={<CheckIcon />}
                    color="success"
                    label={employmentType}
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </CardContent>

        <Divider />

        <CardContent>
          <Box>
            <Typography variant="h6" gutterBottom>
              Complete description of the position
            </Typography>

            <JobPostDescription description={jobPost?.description_html} />
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
