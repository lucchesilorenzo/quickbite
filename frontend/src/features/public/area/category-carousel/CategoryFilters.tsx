import { useRef, useState } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Container, Fade, IconButton } from "@mui/material";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import CategoryDialog from "./CategoryDialog";
import CategoryFilterSkeleton from "./CategoryFilterSkeleton";
import CuisineFilterSlide from "./CategoryFilterSlide";

import { useCategoryFilters } from "@/contexts/CategoryFiltersProvider";

export default function CategoryFilters() {
  const { visibleCategories, allCategories, isLoadingCategories } =
    useCategoryFilters();

  const swiperRef = useRef<SwiperClass>(null);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  function updateScrollButtons(swiper: SwiperClass) {
    setCanScrollPrev(!swiper.isBeginning);
    setCanScrollNext(!swiper.isEnd);
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", alignItems: "center", py: 2 }}
    >
      <Fade in={canScrollPrev}>
        <IconButton
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={!canScrollPrev}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
      </Fade>

      <Box sx={{ width: 1, overflow: "hidden" }}>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateScrollButtons(swiper);
          }}
          onSlideChange={updateScrollButtons}
          keyboard
          mousewheel
          modules={[Keyboard, Mousewheel]}
          breakpoints={{
            0: { slidesPerView: 2 },
            500: { slidesPerView: 3 },
            600: { slidesPerView: 4 },
            800: { slidesPerView: 5 },
            900: { slidesPerView: 6 },
            1000: { slidesPerView: 7 },
            1200: { slidesPerView: 8 },
          }}
        >
          {isLoadingCategories ? (
            Array.from({ length: 8 }).map((_, i) => (
              <SwiperSlide key={i}>
                <CategoryFilterSkeleton />
              </SwiperSlide>
            ))
          ) : (
            <>
              {visibleCategories.map((category) => (
                <SwiperSlide key={category.id}>
                  <CuisineFilterSlide category={category} />
                </SwiperSlide>
              ))}

              <SwiperSlide>
                <CategoryDialog categories={allCategories} />
              </SwiperSlide>
            </>
          )}
        </Swiper>
      </Box>

      <Fade in={canScrollNext}>
        <IconButton
          onClick={() => swiperRef.current?.slideNext()}
          disabled={!canScrollNext}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Fade>
    </Container>
  );
}
