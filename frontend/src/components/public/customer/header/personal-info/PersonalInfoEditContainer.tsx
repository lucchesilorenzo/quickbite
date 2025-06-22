import { Stack, Typography, useMediaQuery } from "@mui/material";

import PersonalInfoEditEmailForm from "./PersonalInfoEditEmailForm";
import PersonalInfoEditFullNameForm from "./PersonalInfoEditFullNameForm";
import PersonalInfoEditPhoneNumberForm from "./PersonalInfoPhoneNumberForm";
import AddressInfoEditStreetAddressForm from "./address-info/AddressInfoEditStreetAddressForm";

export default function PersonalInfoEditContainer() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Stack spacing={4}>
      <PersonalInfoEditFullNameForm />
      <PersonalInfoEditEmailForm />
      <PersonalInfoEditPhoneNumberForm />

      <Typography variant={isMobile ? "body1" : "h6"}>Address info</Typography>

      <AddressInfoEditStreetAddressForm />
    </Stack>
  );
}
