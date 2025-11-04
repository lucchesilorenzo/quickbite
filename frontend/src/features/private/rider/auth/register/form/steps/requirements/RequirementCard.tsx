import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

type RequirementCardProps = {
  requirement: {
    backgroundColor: string;
    title: string;
    description: string;
  };
};

export default function RequirementCard({ requirement }: RequirementCardProps) {
  return (
    <Paper
      key={requirement.title}
      sx={{
        bgcolor: requirement.backgroundColor,
        px: 3,
        py: 4,
      }}
    >
      <Stack direction="row" spacing={4} sx={{ alignItems: "center" }}>
        <CheckCircleOutlineIcon fontSize="large" sx={{ color: grey[800] }} />

        <Box>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            {requirement.title}
          </Typography>

          <Typography variant="body2">{requirement.description}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
