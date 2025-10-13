import { Box, Stack, Typography } from "@mui/material";

import { termsOfService } from "@/lib/constants/content";

export default function Terms() {
  return (
    <Box component="ol" sx={{ listStyle: "none", p: 0, m: 0 }}>
      {termsOfService.map(({ title, content }, titleIndex) => (
        <Box key={titleIndex} component="li" sx={{ mt: 3 }}>
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ alignItems: "center", mb: 1 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {titleIndex + 1}.
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
              {title}
            </Typography>
          </Stack>

          <Stack
            component="ol"
            sx={{ listStyle: "none", p: 0, m: 0, fontSize: 14 }}
          >
            {content.map((paragraph, paragraphIndex) => (
              <Stack
                key={paragraphIndex}
                component="li"
                direction="row"
                spacing={0.5}
                sx={{ mb: 1 }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {titleIndex + 1}.{paragraphIndex + 1}.
                </Typography>

                <Typography variant="body2">{paragraph}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
}
