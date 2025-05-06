import { Stack } from "@mui/material";

import RestaurantCard from "./restaurant-card/RestaurantCard";

import SimpleHeadingWithDialog from "@/components/common/SimpleHeadingWithDialog";
import { useRestaurant } from "@/hooks/contexts/useRestaurant";

export default function RestaurantList() {
  const { restaurants } = useRestaurant();

  return (
    <Stack>
      <SimpleHeadingWithDialog
        headingText={`Order from ${restaurants.length} restaurants`}
        content="Search results are based on a variety of different factors to give you the best experience. Want to know how it works?"
        title="Our search results"
        actionText="Find out more"
      />

      <Stack spacing={2} component="ul" sx={{ listStyle: "none", pl: 0 }}>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </Stack>
    </Stack>
  );
}
