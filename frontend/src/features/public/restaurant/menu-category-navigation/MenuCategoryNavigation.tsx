import { useRef, useState } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Fade, IconButton, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import MenuCategoryNavigationSlide from "@/components/menu-category-navigation/MenuCategoryNavigationSlide";
import ShowMoreMenuCategoriesButton from "@/components/menu-category-navigation/ShowMoreMenuCategoriesButton";
import { useMenu } from "@/contexts/MenuProvider";

export default function MenuCategoryNavigation() {
  const { menuData, menuCategoryRefs } = useMenu();

  const swiperRef = useRef<SwiperClass>(null);

  const [selectedMenuCategoryId, setSelectedMenuCategoryId] = useState("");
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  function updateScrollButtons(swiper: SwiperClass) {
    setCanScrollPrev(!swiper.isBeginning);
    setCanScrollNext(!swiper.isEnd);
  }

  function handleSlideClick(menuCategoryId: string) {
    setSelectedMenuCategoryId(menuCategoryId);

    // Desktop
    document.querySelector(`#category-${menuCategoryId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    // Mobile
    menuCategoryRefs.current[menuCategoryId]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 2 }}>
      <Fade in={canScrollPrev}>
        <IconButton
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={!canScrollPrev}
          color="inherit"
          sx={{
            bgcolor: grey[200],
            "&:hover": { bgcolor: grey[300] },
          }}
          size="small"
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
          spaceBetween={16}
          keyboard
          mousewheel
          modules={[Keyboard, Mousewheel]}
          breakpoints={{
            0: { slidesPerView: 2 },
            500: { slidesPerView: 3 },
            600: { slidesPerView: 4 },
            700: { slidesPerView: 5 },
            800: { slidesPerView: 6 },
          }}
        >
          {menuData.map((menuCategory) => (
            <SwiperSlide key={menuCategory.id}>
              <MenuCategoryNavigationSlide
                menuCategory={menuCategory}
                selectedMenuCategoryId={selectedMenuCategoryId}
                onSlideClick={handleSlideClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Fade in={canScrollNext}>
        <IconButton
          onClick={() => swiperRef.current?.slideNext()}
          disabled={!canScrollNext}
          color="inherit"
          sx={{
            bgcolor: grey[200],
            "&:hover": { bgcolor: grey[300] },
          }}
          size="small"
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Fade>

      <ShowMoreMenuCategoriesButton
        menuCategories={menuData}
        onSlideClick={handleSlideClick}
      />
    </Stack>
  );
}
