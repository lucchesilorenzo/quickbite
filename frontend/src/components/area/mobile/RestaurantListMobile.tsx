import { useEffect } from "react";

import { Box, CircularProgress, Stack } from "@mui/material";
import { useInView } from "react-intersection-observer";

import RestaurantCardMobile from "./RestaurantCardMobile";

import SimpleHeadingWithDialog from "@/components/common/SimpleHeadingWithDialog";
import { useRestaurant } from "@/hooks/contexts/public/useRestaurant";

export default function RestaurantListMobile() {
  const {
    restaurantsData,
    totalRestaurants,
    isFetchingNextPage,
    fetchNextPage,
  } = useRestaurant();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <Stack>
      <SimpleHeadingWithDialog
        headingText={`Order from ${totalRestaurants} restaurants`}
        content="Search results are based on a variety of different factors to give you the best experience. Want to know how it works?"
        title="Our search results"
        actionText="Find out more"
      />

      <Stack spacing={2} component="ul" sx={{ listStyle: "none", pl: 0 }}>
        {restaurantsData.map((restaurant) => (
          <RestaurantCardMobile
            key={restaurant.id}
            restaurant={restaurant}
            type="list"
          />
        ))}
      </Stack>

      <Box ref={ref} sx={{ textAlign: "center", mt: 2 }}>
        {isFetchingNextPage && <CircularProgress size={30} />}
      </Box>
    </Stack>
  );
}
