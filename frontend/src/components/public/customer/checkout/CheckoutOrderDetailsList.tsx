import { List } from "@mui/material";

import AddressInfoItem from "./address-info/AddressInfoItem";
import DeliveryTimeItem from "./delivery-time/DeliveryTimeItem";
import OrderNotesItem from "./order-notes/OrderNotesItem";
import PersonalInfoItem from "./personal-info/PersonalInfoItem";

export default function CheckoutOrderDetailsList() {
  return (
    <List disablePadding>
      <PersonalInfoItem />
      <AddressInfoItem />
      <DeliveryTimeItem />
      <OrderNotesItem />
    </List>
  );
}
