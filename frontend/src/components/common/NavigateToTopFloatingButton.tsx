import { useEffect, useState } from "react";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Fab, Fade, useMediaQuery, useScrollTrigger } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function NavigateToTopFloatingButton() {
  const { pathname } = useLocation();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));
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
          bottom: 16,
          right: pathname.startsWith("/restaurants") && !isMobile ? 340 : 16,
          zIndex: 1200,
        }}
      >
        <Fab color="warning" aria-label="scroll back to top" size="large">
          <KeyboardArrowUpIcon fontSize="large" />
        </Fab>
      </Box>
    </Fade>
  );
}
