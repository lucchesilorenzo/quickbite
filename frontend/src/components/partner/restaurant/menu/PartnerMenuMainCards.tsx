import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { Stack } from "@mui/material";

import PartnerMainCard from "../common/PartnerMainCard";

import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";

export default function PartnerMenuMainCards() {
  const { restaurant } = usePartnerRestaurant();

  const cards = [
    {
      title: "Menu categories",
      description: "View and update your categories",
      icon: MenuBookOutlinedIcon,
      href: `/partner/restaurants/${restaurant.id}/menu/categories`,
    },
    {
      title: "Menu items",
      description: "View and update your products",
      icon: FastfoodOutlinedIcon,
      href: `/partner/restaurants/${restaurant.id}/menu/edit`,
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
