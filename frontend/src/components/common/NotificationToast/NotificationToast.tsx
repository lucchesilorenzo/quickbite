import { Box, Typography } from "@mui/material";

type NotificationToastProps = {
  title: string;
  description: string;
};

export default function NotificationToast({
  title,
  description,
}: NotificationToastProps) {
  return (
    <Box>
      <Typography variant="body1" sx={{ fontWeight: 500 }} gutterBottom>
        {title}
      </Typography>

      <Typography variant="body2">{description}</Typography>
    </Box>
  );
}
