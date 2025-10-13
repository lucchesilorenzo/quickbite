import { SvgIconComponent } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

type WhyChooseUsFeatureSlideMobileProps = {
  feature: {
    icon: SvgIconComponent;
    title: string;
    details: string[];
  };
};

export default function WhyChooseUsFeatureSlideMobile({
  feature,
}: WhyChooseUsFeatureSlideMobileProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Stack spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
      <Paper
        elevation={4}
        sx={{
          px: 2,
          py: 4,
          width: 280,
          height: 200,
        }}
      >
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <feature.icon color="primary" fontSize="large" />

          <Typography
            variant={isMobile ? "body1" : "h6"}
            component="h5"
            sx={{ fontWeight: 700 }}
          >
            {feature.title}
          </Typography>
        </Stack>

        <List dense>
          {feature.details.map((detail) => (
            <ListItem
              key={detail}
              disablePadding
              disableGutters
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
    </Stack>
  );
}
