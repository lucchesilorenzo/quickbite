import ErrorIcon from "@mui/icons-material/Error";
import { Stack, Typography } from "@mui/material";

type FullPageErrorMessageProps = {
  message: string;
  secondaryMessage?: string;
};

export default function FullPageErrorMessage({
  message,
  secondaryMessage,
}: FullPageErrorMessageProps) {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <ErrorIcon fontSize="large" color="error" />

        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          {message}
        </Typography>

        {secondaryMessage && (
          <Typography variant="body2" component="div" color="text.secondary">
            {secondaryMessage}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
