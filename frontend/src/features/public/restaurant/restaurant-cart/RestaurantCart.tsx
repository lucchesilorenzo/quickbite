import { useEffect, useState } from "react";

import { Paper, Typography } from "@mui/material";

import EmptyRestaurantCart from "./EmptyRestaurantCart";
import RestaurantCartFooter from "./RestaurantCartFooter";
import RestaurantCartList from "./RestaurantCartList";
import RestaurantCartMOVNotReachedAlert from "./components/RestaurantCartMOVNotReachedAlert";
import RestaurantCartShippingInfo from "./components/RestaurantCartShippingInfo";
import RestaurantCartSpinner from "./components/RestaurantCartSpinner";

import { useMultiCart } from "@/contexts/MultiCartProvider";
import { useRestaurant } from "@/contexts/RestaurantProvider";

export default function RestaurantCart() {
  const { restaurantData } = useRestaurant();
  const { isEmpty, cartTotal, isCartUpdating } = useMultiCart();

  const [topOffset, setTopOffset] = useState(0);
  const [bottomOffset, setBottomOffset] = useState(0);

  const subtotal = cartTotal(restaurantData.restaurant.id);
  const amountToReachMOV = restaurantData.restaurant.min_amount - subtotal;
  const showMOVNotReachedAlert =
    restaurantData.restaurant.min_amount > 0 &&
    amountToReachMOV > 0 &&
    !isEmpty(restaurantData.restaurant.id);

  useEffect(() => {
    const header = document.querySelector("#back-to-top");
    const footer = document.querySelector("#footer");

    if (!header || !footer) return;

    const observerHeader = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTopOffset(entry.intersectionRect.height);
      } else {
        setTopOffset(0);
      }
    });

    const observerFooter = new IntersectionObserver(([entry]) => {
      // When footer is visible, set the bottom offset to the height of the footer (dynamic)
      if (entry.isIntersecting) {
        setBottomOffset(entry.intersectionRect.height);
      } else {
        setBottomOffset(0);
      }
    });

    observerHeader.observe(header);
    observerFooter.observe(footer);

    return () => {
      observerHeader.disconnect();
      observerFooter.disconnect();
    };
  }, []);

  return (
    <Paper
      sx={{
        position: "sticky",
        top: 0,
        height: `calc(100vh - ${topOffset + bottomOffset}px)`,
        display: "flex",
        flexDirection: "column",
        transition: "height 0.3s ease",
      }}
      elevation={3}
    >
      {isCartUpdating && <RestaurantCartSpinner />}

      <Typography
        component="h2"
        variant="h5"
        sx={{ textAlign: "center", fontWeight: 700, p: 2 }}
      >
        Cart
      </Typography>

      <RestaurantCartShippingInfo />

      {showMOVNotReachedAlert && (
        <RestaurantCartMOVNotReachedAlert amountToReachMOV={amountToReachMOV} />
      )}

      {!isEmpty(restaurantData.restaurant.id) ? (
        <>
          <RestaurantCartList />
          <RestaurantCartFooter />
        </>
      ) : (
        <EmptyRestaurantCart />
      )}
    </Paper>
  );
}
