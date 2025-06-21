import { List } from "@mui/material";

import PersonalInfoItem from "./personal-info/PersonalInfoItem";

export default function CheckoutOrderDetailsList() {
  return (
    <List disablePadding>
      <PersonalInfoItem />
    </List>
  );
}
