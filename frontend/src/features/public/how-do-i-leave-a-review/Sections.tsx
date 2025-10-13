import { Box, Typography } from "@mui/material";

import { howDoILeaveAReviewSections } from "@/lib/constants/content";

export default function Sections() {
  return (
    <Box>
      {howDoILeaveAReviewSections.map(({ title, content }, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography
            component="p"
            variant="body1"
            sx={{ fontWeight: 600, mb: 2 }}
          >
            {title}
          </Typography>

          {content.map((paragraph, index) => (
            <Typography key={index} variant="body1" sx={{ mb: 2 }}>
              {paragraph}
            </Typography>
          ))}
        </Box>
      ))}
    </Box>
  );
}
