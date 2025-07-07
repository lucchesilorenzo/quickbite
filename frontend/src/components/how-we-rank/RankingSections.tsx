import { Box, Typography } from "@mui/material";

import { rankingSections } from "@/lib/data";

export default function RankingSections() {
  return (
    <Box>
      {rankingSections.map(({ title, description, points }, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography
            component="p"
            variant="body1"
            sx={{ fontWeight: 600, mb: 2 }}
          >
            {title}
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            {description}
          </Typography>

          {points && (
            <Box component="ul" sx={{ listStyle: "disc" }}>
              {points.map((point, pointIndex) => (
                <Typography
                  key={pointIndex}
                  component="li"
                  variant="body1"
                  sx={{ mb: 1 }}
                >
                  {point}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
