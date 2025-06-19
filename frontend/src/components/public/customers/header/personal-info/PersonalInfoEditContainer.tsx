import { Stack } from "@mui/material";

import PersonalInfoEditEmailForm from "./PersonalInfoEditEmailForm";
import PersonalInfoEditFullNameForm from "./PersonalInfoEditFullNameForm";
import PersonalInfoEditPhoneNumberForm from "./PersonalInfoPhoneNumberForm";

export default function PersonalInfoEditContainer() {
  return (
    <Stack spacing={4}>
      <PersonalInfoEditFullNameForm />
      <PersonalInfoEditEmailForm />
      <PersonalInfoEditPhoneNumberForm />
    </Stack>
  );
}
