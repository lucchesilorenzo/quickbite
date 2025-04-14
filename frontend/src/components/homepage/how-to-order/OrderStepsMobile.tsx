import { useCallback, useEffect, useState } from "react";

import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";

import { orderSteps } from "@/lib/data";

export default function OrderStepsMobile() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <Box sx={{ overflow: "hidden", width: "100%" }} ref={emblaRef}>
      <Box sx={{ display: { xs: "flex", lg: "none" } }}>
        {orderSteps.map((step) => (
          <Box
            key={step.title}
            sx={{
              display: "flex",
              flexDirection: "column",
              scrollSnapAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              flex: "0 0 100%",
              width: 280,
              px: 2,
              gap: 2,
            }}
          >
            <step.icon color="primary" fontSize="large" />

            <Typography
              variant={isMobile ? "body1" : "h6"}
              component="h5"
              sx={{ fontWeight: "700" }}
            >
              {step.title}
            </Typography>

            <Typography variant="body2" component="p">
              {step.subtitle}
            </Typography>
          </Box>
        ))}
      </Box>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: { xs: "flex", lg: "none" },
          justifyContent: "center",
          mt: 3,
        }}
      >
        {scrollSnaps.map((_, index) => (
          <IconButton
            key={index}
            size="small"
            onClick={() => emblaApi?.scrollTo(index)}
            sx={{
              width: 8,
              height: 8,
              bgcolor: selectedIndex === index ? "#ed6c02" : "grey.300",
              p: 0,
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
