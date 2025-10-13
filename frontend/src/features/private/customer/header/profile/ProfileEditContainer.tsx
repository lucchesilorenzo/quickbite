import { Stack, Typography } from "@mui/material";

import AddressInfoEditForm from "./address-info/AddressInfoEditForm";
import PersonalInfoEditDateOfBirthForm from "./personal-info/PersonalInfoEditDateOfBirthForm";
import PersonalInfoEditEmailForm from "./personal-info/PersonalInfoEditEmailForm";
import PersonalInfoEditFullNameForm from "./personal-info/PersonalInfoEditFullNameForm";
import PersonalInfoEditPhoneNumberForm from "./personal-info/PersonalInfoPhoneNumberForm";

export default function ProfileEditContainer() {
  return (
    <Stack spacing={4}>
      <Typography variant="h6">Personal info</Typography>

      <PersonalInfoEditFullNameForm />
      <PersonalInfoEditEmailForm />
      <PersonalInfoEditPhoneNumberForm />
      <PersonalInfoEditDateOfBirthForm />

      <Typography variant="h6">Address info</Typography>

      <AddressInfoEditForm />
    </Stack>
  );
}
