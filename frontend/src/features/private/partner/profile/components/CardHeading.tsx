import { SvgIconComponent } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

type CardHeadingProps = {
  title: string;
  description?: string;
  icon?: SvgIconComponent;
};

export default function CardHeading({
  title,
  description,
  icon: Icon,
}: CardHeadingProps) {
  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
        {Icon && <Icon color="inherit" />}

        <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
          {title}
        </Typography>
      </Stack>

      {description && (
        <Typography variant="body2" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
    </Box>
  );
}
