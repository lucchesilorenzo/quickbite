import { Box, Stack, Typography } from "@mui/material";

import { privacyPolicy } from "@/lib/data";

export default function Paragraphs() {
  return (
    <Box component="ol" sx={{ listStyle: "none", p: 0, m: 0 }}>
      {privacyPolicy.map(({ title, content }, titleIndex) => (
        <Box key={titleIndex} component="li" sx={{ mt: 3 }}>
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ alignItems: "center", mb: 1 }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {titleIndex + 1}.
            </Typography>

            <Typography variant="body2" sx={{ fontWeight: 700 }} gutterBottom>
              {title}
            </Typography>
          </Stack>

          {content.map((item, itemIndex) => (
            <Box key={itemIndex}>
              {item.type === "paragraph" && (
                <Typography variant="body2">{item.text}</Typography>
              )}

              {item.type === "list" && (
                <Box component="ul" sx={{ listStyle: "disc", mb: 1 }}>
                  {item.items?.map((listItem, listItemIndex) => (
                    <Box key={listItemIndex} component="li">
                      <Typography variant="body2">{listItem}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
