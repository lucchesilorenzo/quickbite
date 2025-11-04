import { Stack } from "@mui/material";

import PersonalInfoContactSection from "./PersonalInfoContactSection";
import PersonalInfoNameSection from "./PersonalInfoNameSection";

export default function PersonalInfoStep() {
  return (
    <Stack spacing={4}>
      <PersonalInfoNameSection />
      <PersonalInfoContactSection />
    </Stack>
  );
}
