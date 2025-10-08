import { SvgIconComponent } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Card, IconButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type MainCardProps = {
  card: {
    title: string;
    description: string;
    icon: SvgIconComponent;
    href: string;
  };
};

export default function MainCard({ card }: MainCardProps) {
  return (
    <Card variant="outlined" sx={{ p: 2, height: 1 }}>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <card.icon color="primary" />

          <Stack>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {card.title}
            </Typography>

            <Typography variant="body2">{card.description}</Typography>
          </Stack>
        </Stack>

        <IconButton
          component={Link}
          to={card.href}
          sx={{ "&:hover": { bgcolor: "transparent" } }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
    </Card>
  );
}
