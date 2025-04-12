import { Stack, Typography } from "@mui/material";

import { orderSteps } from "@/lib/data";

export default function OrderStepsDesktop() {
  return (
    <Stack
      direction="row"
      spacing={4}
      sx={{ display: { xs: "none", md: "flex" } }}
    >
      {orderSteps.map((step) => (
        <Stack
          key={step.title}
          spacing={1}
          sx={{
            alignItems: "center",
            textAlign: "center",
            width: 300,
          }}
        >
          <step.icon color="primary" fontSize="large" />

          <Typography variant="h6" component="h5" sx={{ fontWeight: "700" }}>
            {step.title}
          </Typography>

          <Typography variant="body2" component="p">
            {step.subtitle}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
