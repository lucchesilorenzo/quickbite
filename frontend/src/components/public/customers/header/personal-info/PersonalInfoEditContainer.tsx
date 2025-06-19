import { Stack } from "@mui/material";

import PersonalInfoEditEmailForm from "./PersonalInfoEditEmailForm";
import PersonalInfoEditFullNameForm from "./PersonalInfoEditFullNameForm";

export default function PersonalInfoEditContainer() {
  return (
    <Stack spacing={4}>
      <PersonalInfoEditFullNameForm />
      <PersonalInfoEditEmailForm />
    </Stack>
  );
}
