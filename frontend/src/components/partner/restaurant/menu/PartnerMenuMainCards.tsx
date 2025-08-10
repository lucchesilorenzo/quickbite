import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Stack } from "@mui/material";

import PartnerMainCard from "../common/PartnerMainCard";

import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";

export default function PartnerMenuMainCards() {
  const { restaurant } = usePartnerRestaurant();

  const cards = [
    {
      title: "Menu",
      description: "View and update your menu",
      icon: FastfoodOutlinedIcon,
      href: `/partner/restaurants/${restaurant.id}/menu/edit`,
    },
    {
      title: "Menu",
      description: "Suspend your products temporarily",
      icon: VisibilityOffOutlinedIcon,
      href: `/partner/restaurants/${restaurant.id}/menu/suspend`,
    },
  ];

  return (
    <Stack spacing={2}>
      {cards.map((card) => (
        <PartnerMainCard key={card.title} card={card} />
      ))}
    </Stack>
  );
}
