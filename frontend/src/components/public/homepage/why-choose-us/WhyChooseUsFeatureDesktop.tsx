import CheckIcon from "@mui/icons-material/Check";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { whyChooseUsFeatures } from "@/lib/data";

export default function WhyChooseUsFeatureDesktop() {
  return (
    <Stack
      direction="row"
      spacing={4}
      sx={{ display: { xs: "none", lg: "flex" } }}
    >
      {whyChooseUsFeatures.map((feature) => (
        <Paper
          key={feature.title}
          elevation={4}
          sx={{
            px: 2,
            py: 4,
            width: 280,
          }}
        >
          <Stack spacing={2} sx={{ alignItems: "center" }}>
            <feature.icon color="primary" fontSize="large" />

            <Typography variant="h6" component="h5" sx={{ fontWeight: 700 }}>
              {feature.title}
            </Typography>
          </Stack>

          <List dense>
            {feature.details.map((detail) => (
              <ListItem
                disablePadding
                disableGutters
                key={detail}
                alignItems="flex-start"
                sx={{ wordBreak: "break-word" }}
              >
                <ListItemIcon sx={{ m: 0 }}>
                  <CheckIcon fontSize="small" />
                </ListItemIcon>

                <ListItemText primary={detail} sx={{ m: 0 }} />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Stack>
  );
}
