import { useCallback, useEffect, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";

import { whyChooseUsFeatures } from "@/lib/data";

export default function WhyChooseUsFeatureMobile() {
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
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        {whyChooseUsFeatures.map((feature) => (
          <Box
            key={feature.title}
            sx={{
              display: "flex",
              scrollSnapAlign: "center",
              justifyContent: "center",
              flex: "0 0 100%",
              width: 280,
              px: 2,
            }}
          >
            <Paper elevation={4} sx={{ px: 2, py: 4, width: 280 }}>
              <Stack spacing={2} sx={{ alignItems: "center" }}>
                <feature.icon color="primary" fontSize="large" />

                <Typography
                  variant={isMobile ? "body1" : "h6"}
                  component="h5"
                  sx={{ fontWeight: "700" }}
                >
                  {feature.title}
                </Typography>

                <List dense>
                  {feature.details.map((detail) => (
                    <ListItem
                      key={detail}
                      disablePadding
                      disableGutters
                      alignItems="flex-start"
                      sx={{ wordBreak: "break-word" }}
                    >
                      <ListItemIcon sx={{ m: 0 }}>
                        <CheckIcon fontSize="small" />
                      </ListItemIcon>

                      <ListItemText primary={detail} sx={{ m: 0 }} />
                    </ListItem>
                  ))}
                </List>
              </Stack>
            </Paper>
          </Box>
        ))}
      </Box>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: { xs: "flex", md: "none" },
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
              borderRadius: "50%",
              bgcolor: selectedIndex === index ? "#ed6c02" : "grey.300",
              transition: "background-color 0.3s",
              p: 0,
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
