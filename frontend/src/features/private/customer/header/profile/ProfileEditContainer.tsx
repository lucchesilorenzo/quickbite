import { Stack, Typography } from "@mui/material";

import AddressInfoEditForm from "./address-info/AddressInfoEditForm";
import EditPersonalInfoPasswordForm from "./personal-info/EditPersonalInfoPasswordForm";
import PersonalInfoEditDateOfBirthForm from "./personal-info/PersonalInfoEditDateOfBirthForm";
import PersonalInfoEditEmailForm from "./personal-info/PersonalInfoEditEmailForm";
import PersonalInfoEditFullNameForm from "./personal-info/PersonalInfoEditFullNameForm";
import PersonalInfoEditPhoneNumberForm from "./personal-info/PersonalInfoEditPhoneNumberForm";

import { useAuth } from "@/contexts/AuthProvider";

export default function ProfileEditContainer() {
  const { user } = useAuth();

  return (
    <Stack spacing={4}>
      <Typography variant="h6">Personal info</Typography>

      <PersonalInfoEditFullNameForm />
      <PersonalInfoEditEmailForm />
      {!user?.has_password && <EditPersonalInfoPasswordForm />}
      <PersonalInfoEditPhoneNumberForm />
      <PersonalInfoEditDateOfBirthForm />

      <Typography variant="h6">Address info</Typography>

      <AddressInfoEditForm />
    </Stack>
  );
}
