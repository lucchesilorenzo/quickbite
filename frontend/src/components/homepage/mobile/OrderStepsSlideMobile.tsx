import { SvgIconComponent } from "@mui/icons-material";
import { Stack, Typography, useMediaQuery } from "@mui/material";

type OrderStepsSlideMobileProps = {
  step: {
    icon: SvgIconComponent;
    title: string;
    subtitle: string;
  };
};

export default function OrderStepsSlideMobile({
  step,
}: OrderStepsSlideMobileProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Stack
      spacing={2}
      sx={{
        width: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <step.icon color="primary" fontSize="large" />

      <Typography
        variant={isMobile ? "body1" : "h6"}
        component="h5"
        sx={{ fontWeight: 700 }}
      >
        {step.title}
      </Typography>

      <Typography variant="body2" component="p">
        {step.subtitle}
      </Typography>
    </Stack>
  );
}
