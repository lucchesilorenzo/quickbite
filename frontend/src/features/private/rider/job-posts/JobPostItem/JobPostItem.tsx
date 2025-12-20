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

export default function JobPostItem() {
  return (
    <Card variant="outlined">
      <CardActionArea sx={{}}>
        <CardContent sx={{ p: 2 }}>
          <Chip
            color="info"
            label="New job post"
            size="small"
            sx={{ fontWeight: 500 }}
          />

          <Typography variant="h6" component="div" sx={{ mt: 1 }}>
            Full Stack Developer
          </Typography>

          <Box sx={{ mt: 1 }}>
            <Typography color="textSecondary" variant="body2" component="div">
              Company name
            </Typography>

            <Typography color="textSecondary" variant="body2" component="div">
              Postcode City
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Chip
              label="30.000€ a year"
              size="small"
              sx={{ fontWeight: 500 }}
            />

            <Chip
              color="success"
              label="Full-time"
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
