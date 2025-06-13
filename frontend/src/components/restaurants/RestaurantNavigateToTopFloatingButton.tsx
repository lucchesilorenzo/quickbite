import { useEffect, useState } from "react";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Fab, Fade, useMediaQuery, useScrollTrigger } from "@mui/material";

import { useMultiCart } from "@/hooks/contexts/useMultiCart";
import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function RetaurantNavigateToTopFloatingButton() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { restaurant } = useSingleRestaurant();
  const { isEmpty } = useMultiCart();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("#footer");
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsFooterVisible(entry.isIntersecting);
    });

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  function handleClick() {
    const anchor = document.querySelector("#back-to-top");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <Fade in={trigger && !isFooterVisible}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: "fixed",
          bottom: isMobile && !isEmpty(restaurant.id) ? 100 : 16,
          right: !isMobile && !isEmpty(restaurant.id) ? 340 : 16,
          zIndex: 2000,
        }}
      >
        <Fab color="warning" aria-label="scroll back to top" size="large">
          <KeyboardArrowUpIcon fontSize="large" />
        </Fab>
      </Box>
    </Fade>
  );
}
