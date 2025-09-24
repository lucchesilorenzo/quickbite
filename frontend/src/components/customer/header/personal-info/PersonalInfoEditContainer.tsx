import { Stack, Typography } from "@mui/material";

import PersonalInfoEditDateOfBirthForm from "./PersonalInfoEditDateOfBirthForm";
import PersonalInfoEditEmailForm from "./PersonalInfoEditEmailForm";
import PersonalInfoEditFullNameForm from "./PersonalInfoEditFullNameForm";
import PersonalInfoEditPhoneNumberForm from "./PersonalInfoPhoneNumberForm";
import AddressInfoEditBuildingNumberForm from "./address-info/AddressInfoEditBuildingNumberForm";
import AddressInfoEditCityForm from "./address-info/AddressInfoEditCityForm";
import AddressInfoEditPostcodeForm from "./address-info/AddressInfoEditPostcodeForm";
import AddressInfoEditStreetAddressForm from "./address-info/AddressInfoEditStreetAddressForm";

export default function PersonalInfoEditContainer() {
  return (
    <Stack spacing={4}>
      <PersonalInfoEditFullNameForm />
      <PersonalInfoEditEmailForm />
      <PersonalInfoEditPhoneNumberForm />
      <PersonalInfoEditDateOfBirthForm />

      <Typography variant="h6">Address info</Typography>

      <AddressInfoEditStreetAddressForm />
      <AddressInfoEditBuildingNumberForm />
      <AddressInfoEditPostcodeForm />
      <AddressInfoEditCityForm />
    </Stack>
  );
}
