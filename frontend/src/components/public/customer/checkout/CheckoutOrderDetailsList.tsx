import { List } from "@mui/material";

import AddressInfoItem from "./address-info/AddressInfoItem";
import PersonalInfoItem from "./personal-info/PersonalInfoItem";

export default function CheckoutOrderDetailsList() {
  return (
    <List disablePadding>
      <PersonalInfoItem />
      <AddressInfoItem />
    </List>
  );
}
