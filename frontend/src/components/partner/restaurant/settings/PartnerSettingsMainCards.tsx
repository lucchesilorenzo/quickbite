import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import { Stack } from "@mui/material";

import PartnerSettingsMainCard from "./PartnerSettingsMainCard";

import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";

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
      href: `/partner/restaurants/${restaurant.id}/settings/delivery-time`,
    },
    {
      title: "Promotions",
      description: "Create and manage your active offers",
      icon: LocalOfferOutlinedIcon,
      href: `/partner/restaurants/${restaurant.id}/settings/promotions`,
    },
    {
      title: "Restaurant profile",
      description: "Update your logo, contact info and details",
      icon: StoreOutlinedIcon,
      href: `/partner/restaurants/${restaurant.id}/settings/other`,
    },
  ];

  return (
    <Stack spacing={2}>
      {cards.map((card) => (
        <PartnerSettingsMainCard key={card.title} card={card} />
      ))}
    </Stack>
  );
}
