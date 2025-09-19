import { Box, Typography } from "@mui/material";

import PartnerBackButton from "./PartnerBackButton";

type PartnerHeadingBlockProps = {
  title: string;
  description?: string;
  backButton?: boolean;
};

export default function PartnerHeadingBlock({
  title,
  description,
  backButton = false,
}: PartnerHeadingBlockProps) {
  return (
    <Box>
      {backButton && <PartnerBackButton />}

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
