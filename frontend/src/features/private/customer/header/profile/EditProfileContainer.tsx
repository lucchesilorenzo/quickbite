import { Stack, Typography } from "@mui/material";

import EditAddressInfoForm from "./address-info/EditAddressInfoForm";
import EditPersonalInfoDateOfBirthForm from "./personal-info/EditPersonalInfoDateOfBirthForm";
import EditPersonalInfoEmailForm from "./personal-info/EditPersonalInfoEmailForm";
import EditPersonalInfoFullNameForm from "./personal-info/EditPersonalInfoFullNameForm";
import EditPersonalInfoPasswordForm from "./personal-info/EditPersonalInfoPasswordForm";
import EditPersonalInfoPhoneNumberForm from "./personal-info/EditPersonalInfoPhoneNumberForm";

import { useAuth } from "@/contexts/AuthProvider";

export default function EditProfileContainer() {
  const { user } = useAuth();

  return (
    <Stack spacing={4}>
      <Typography variant="h6">Personal info</Typography>

      <EditPersonalInfoFullNameForm />
      <EditPersonalInfoEmailForm />
      {!user?.has_password && <EditPersonalInfoPasswordForm />}
      <EditPersonalInfoPhoneNumberForm />
      <EditPersonalInfoDateOfBirthForm />

      <Typography variant="h6">Address info</Typography>

      <EditAddressInfoForm />
    </Stack>
  );
}
