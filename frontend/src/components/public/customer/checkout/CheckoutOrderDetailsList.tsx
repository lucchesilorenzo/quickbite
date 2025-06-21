import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { List } from "@mui/material";

import CheckoutOrderDetailsItem from "./CheckoutOrderDetailsItem";

import { useAuth } from "@/hooks/contexts/useAuth";

export default function CheckoutOrderDetailsList() {
  const { user } = useAuth();

  if (!user) return null;

  const checkoutOrderDetailsListItems = [
    {
      startIcon: PersonOutlineOutlinedIcon,
      title: `${user.first_name} ${user.last_name}`,
      subtitle: user.phone_number,
      endIcon: ArrowForwardIosIcon,
    },
  ];

  return (
    <List disablePadding>
      {checkoutOrderDetailsListItems.map((item, index) => (
        <CheckoutOrderDetailsItem key={index} item={item} />
      ))}
    </List>
  );
}
