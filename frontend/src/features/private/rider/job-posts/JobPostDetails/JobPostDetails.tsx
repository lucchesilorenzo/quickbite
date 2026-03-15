import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CheckIcon from "@mui/icons-material/Check";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
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
import { JobPostWithRestaurantAndAlreadyApplied } from "@rider/types/job-posts/job-post.types";
import { Link } from "react-router-dom";

import JobPostDescription from "../JobPostDescription";

import { employmentTypes } from "@/features/private/shared/lib/data/job-posts.data";
import { vehicles } from "@/features/private/shared/lib/data/vehicles.data";
import { formatCurrency } from "@/lib/utils/formatting.utils";

type JobPostDetailsProps = {
  jobPost?: JobPostWithRestaurantAndAlreadyApplied;
};

export default function JobPostDetails({ jobPost }: JobPostDetailsProps) {
  const employmentType = employmentTypes.find(
    (option) => option.value === jobPost?.employment_type,
  )?.label;

  const vehicleType = vehicles.find(
    (option) => option.value === jobPost?.vehicle_type,
  )?.label;

  const jobPostDetails = [
    {
      icon: PaymentsIcon,
      label: "Salary",
      value: jobPost?.salary && `${formatCurrency(jobPost.salary)} / year`,
    },
    {
      icon: BusinessCenterIcon,
      label: "Employment type",
      value: employmentType,
    },
    {
      icon: DeliveryDiningIcon,
      label: "Vehicle type",
      value: vehicleType,
    },
  ];

  return (
    <Card variant="outlined">
      <CardHeader
        data-testid="job-post-details-header"
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

            <Button
              disabled={jobPost?.already_applied}
              component={Link}
              to={`/rider/job-posts/${jobPost?.id}/apply`}
              variant="contained"
              color="info"
            >
              Apply now
            </Button>
          </Box>
        }
      />

      <Divider />

      <Box
        data-testid="job-post-details"
        sx={{ maxHeight: 600, overflowY: "auto" }}
      >
        <CardContent>
          <Box>
            <Typography variant="h6" gutterBottom>
              Job post details
            </Typography>

            <Stack spacing={4}>
              {jobPostDetails.map(({ icon: Icon, label, value }) => {
                if (!value) return null;

                return (
                  <Stack key={label} direction="row" spacing={1}>
                    <Icon fontSize="inherit" />

                    <Stack spacing={1}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {label}
                      </Typography>

                      <Chip
                        icon={<CheckIcon />}
                        color="success"
                        label={value}
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    </Stack>
                  </Stack>
                );
              })}
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
