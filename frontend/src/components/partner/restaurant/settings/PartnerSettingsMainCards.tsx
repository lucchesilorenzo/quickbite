import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import { Stack } from "@mui/material";

import PartnerMainCard from "../common/PartnerMainCard";

import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";

export default function PartnerSettingsMainCards() {
  const { restaurant } = usePartnerRestaurant();

  const cards = [
    {
      title: "Fees",
      description: "Set your delivery, service and minimum order fees",
      icon: ShoppingBagOutlinedIcon,
      href: `/partner/restaurants/${restaurant.id}/settings/fees`,
    },
    {
      title: "Delivery times",
      description: "Configure your delivery time slots and availability",
      icon: WatchLaterOutlinedIcon,
      href: `/partner/restaurants/${restaurant.id}/settings/delivery-times`,
    },
    {
      title: "Restaurant info",
      description: "Update your logo, contact info and details",
      icon: StoreOutlinedIcon,
      href: `/partner/restaurants/${restaurant.id}/settings/info`,
    },
  ];

  return (
    <Stack spacing={2} sx={{ my: 3 }}>
      {cards.map((card) => (
        <PartnerMainCard key={card.title} card={card} />
      ))}
    </Stack>
  );
}
