import { useCallback, useEffect, useState } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Container, Fade, IconButton } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";

import CategoriesDialog from "./CategoriesDialog";
import CuisineFilterSlide from "./CategoryFilterSlide";

import { categories } from "@/lib/data";
import { Category } from "@/types";

export default function CategoriesFilter() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(true);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [newCategories, setNewCategories] = useState(categories); // Mock data

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

  function handleStatusChange(category: Category) {
    const categoryToUpdate = newCategories.find(
      (item) => item.name === category.name,
    );

    if (categoryToUpdate) {
      setNewCategories(
        newCategories.map((item) =>
          item.name === categoryToUpdate.name
            ? { ...item, selected: !item.selected }
            : item,
        ),
      );
    }
  }

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
          {categories.map((category, index) => (
            <CuisineFilterSlide
              key={index}
              category={category}
              onStatusChange={handleStatusChange}
            />
          ))}

          <CategoriesDialog categories={newCategories} />
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
