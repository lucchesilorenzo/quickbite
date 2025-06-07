import { useCallback, useEffect, useState } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Box,
  CircularProgress,
  Container,
  Fade,
  IconButton,
  Stack,
} from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";

import CategoryDialog from "./CategoryDialog";
import CuisineFilterSlide from "./CategoryFilterSlide";

import { useCategoryFilters } from "@/hooks/contexts/useCategoryFilters";

export default function CategoryFilters() {
  const { visibleCategories, allCategories, isLoadingCategories } =
    useCategoryFilters();

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
    <Container
      maxWidth="lg"
      sx={{ display: "flex", alignItems: "center", py: 2 }}
    >
      <Fade in={canScrollPrev}>
        <IconButton onClick={scrollPrev} disabled={!canScrollPrev}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
      </Fade>

      <Box sx={{ overflow: "hidden", flex: 1 }} ref={emblaRef}>
        <Stack direction="row" sx={{ alignItems: "center" }}>
          {isLoadingCategories ? (
            <CircularProgress size={24} />
          ) : (
            <>
              {visibleCategories.map((category) => (
                <CuisineFilterSlide key={category.id} category={category} />
              ))}

              <CategoryDialog categories={allCategories} />
            </>
          )}
        </Stack>
      </Box>

      <Fade in={canScrollNext}>
        <IconButton onClick={scrollNext} disabled={!canScrollNext}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Fade>
    </Container>
  );
}
