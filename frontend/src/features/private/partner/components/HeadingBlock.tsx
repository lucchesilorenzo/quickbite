import { Box, Typography } from "@mui/material";

import BackButton from "./BackButton";

type HeadingBlockProps = {
  title: string;
  description?: string;
  backButton?: boolean;
};

export default function HeadingBlock({
  title,
  description,
  backButton = false,
}: HeadingBlockProps) {
  return (
    <Box>
      {backButton && <BackButton />}

      <Box sx={{ mt: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
          {title}
        </Typography>

        {description && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
