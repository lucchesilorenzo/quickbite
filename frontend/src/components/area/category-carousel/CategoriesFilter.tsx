import { useCallback, useEffect, useState } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Container, Fade, IconButton } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";

import CategoriesDialog from "./CategoriesDialog";
import CuisineFilterSlide from "./CategoryFilterSlide";

import { useCategoriesFilter } from "@/hooks/contexts/useCategoriesFilter";

export default function CategoriesFilter() {
  const { visibleCategories, allCategories } = useCategoriesFilter();

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
      sx={{ display: "flex", alignItems: "center", my: 2 }}
    >
      <Fade in={canScrollPrev}>
        <IconButton onClick={scrollPrev} disabled={!canScrollPrev}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
      </Fade>

      <Box sx={{ overflow: "hidden", flex: 1 }} ref={emblaRef}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {visibleCategories.map((category, index) => (
            <CuisineFilterSlide key={index} category={category} />
          ))}

          <CategoriesDialog categories={allCategories} />
        </Box>
      </Box>

      <Fade in={canScrollNext}>
        <IconButton onClick={scrollNext} disabled={!canScrollNext}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Fade>
    </Container>
  );
}
