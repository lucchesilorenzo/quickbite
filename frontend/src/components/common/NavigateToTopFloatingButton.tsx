import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Fab, Fade, useMediaQuery, useScrollTrigger } from "@mui/material";

export default function NavigateToTopFloatingButton() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  function handleClick() {
    const anchor = document.querySelector("#back-to-top");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1200,
        }}
      >
        <Fab
          color="warning"
          aria-label="scroll back to top"
          size={isMobile ? "medium" : "large"}
        >
          <KeyboardArrowUpIcon fontSize={isMobile ? "medium" : "large"} />
        </Fab>
      </Box>
    </Fade>
  );
}
