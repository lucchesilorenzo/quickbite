import { useCallback, useEffect, useState } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button, Fade, IconButton, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import useEmblaCarousel from "embla-carousel-react";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function MenuCategoryNavigation() {
  const { restaurant } = useSingleRestaurant();
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<
    string | null
  >(null);

  const menuCategories = [...restaurant.menu_categories]
    .sort((a, b) => a.order - b.order)
    .map((menuCategory) => menuCategory.name);

  function handleClick(menuCategory: string) {
    setSelectedMenuCategory(menuCategory);

    const category = document.querySelector(`#category_${menuCategory}`);

    if (category) {
      category.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(true);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <Stack direction="row" sx={{ alignItems: "center", mt: 1 }}>
      {canScrollPrev && (
        <Fade in={canScrollPrev}>
          <IconButton
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            color="inherit"
            sx={{
              bgcolor: grey[200],
              "&:hover": {
                bgcolor: grey[300],
              },
            }}
            size="small"
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        </Fade>
      )}

      <Box sx={{ overflow: "hidden", flex: 1 }} ref={emblaRef}>
        <Stack
          component="nav"
          direction="row"
          spacing={2}
          sx={{ alignItems: "center" }}
        >
          {menuCategories.map((menuCategory) => (
            <Button
              key={menuCategory}
              onClick={() => handleClick(menuCategory)}
              sx={{
                minWidth: 100,
                textTransform: "none",
                whiteSpace: "nowrap",
                borderRadius: 2,
                color: "inherit",
                transition: "0.2s ease-in-out",
                "&:hover": { bgcolor: grey[200] },
                ...(selectedMenuCategory === menuCategory && {
                  bgcolor: "#262626",
                  color: "white",
                  "&:hover": { bgcolor: "#333333" },
                }),
              }}
            >
              {menuCategory}
            </Button>
          ))}
        </Stack>
      </Box>

      {canScrollNext && (
        <Fade in={canScrollNext}>
          <IconButton
            onClick={scrollNext}
            disabled={!canScrollNext}
            color="inherit"
            sx={{
              bgcolor: grey[200],
              "&:hover": {
                bgcolor: grey[300],
              },
            }}
            size="small"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Fade>
      )}
    </Stack>
  );
}
