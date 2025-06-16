import { Box, LinearProgress, Stack, Typography } from "@mui/material";

type PasswordStrengthIndicatorProps = {
  strength: number;
};

export default function PasswordStrengthIndicator({
  strength,
}: PasswordStrengthIndicatorProps) {
  return (
    <Box>
      <LinearProgress
        variant="determinate"
        value={strength}
        sx={{
          borderRadius: 5,
          bgcolor: "#eee",
          "& .MuiLinearProgress-bar": {
            bgcolor: strength < 50 ? "red" : strength < 80 ? "orange" : "green",
          },
        }}
      />

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" component="div">
          Password strength:
        </Typography>

        <Typography variant="body2" component="span" sx={{ fontWeight: 700 }}>
          {strength < 50 ? "Too weak" : strength < 80 ? "Medium" : "Strong"}
        </Typography>
      </Stack>
    </Box>
  );
}
