import { useEffect, useState } from "react";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Fab, Fade, useScrollTrigger } from "@mui/material";

export default function NavigateToTopFloatingButton() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    function checkDialogOpen() {
      const isDialogOpen = !!document.querySelector('[role="dialog"]');
      setDialogOpen(isDialogOpen);
    }

    const observer = new MutationObserver(checkDialogOpen);
    observer.observe(document.body, { childList: true, subtree: true });

    checkDialogOpen();

    return () => observer.disconnect();
  }, []);

  function handleClick() {
    const anchor = document.querySelector("#back-to-top");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <Fade in={trigger && !dialogOpen}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 2000 }}
      >
        <Fab color="warning" aria-label="scroll back to top" size="large">
          <KeyboardArrowUpIcon fontSize="large" />
        </Fab>
      </Box>
    </Fade>
  );
}
