import { useEffect, useRef, useState } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Box, Fade, IconButton, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import MenuCategoryNavigationDialog from "./MenuCategoryNavigationDialog";
import MenuCategoryNavigationSlide from "./MenuCategoryNavigationSlide";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function MenuCategoryNavigation() {
  const { restaurant, menuCategoryRefs } = useSingleRestaurant();

  const swiperRef = useRef<SwiperClass>(null);

  const [selectedMenuCategoryId, setSelectedMenuCategoryId] = useState("");
  const [
    openMenuCategoryNavigationDialog,
    setOpenMenuCategoryNavigationDialog,
  ] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const menuCategories = [...restaurant.menu_categories].sort(
    (a, b) => a.order - b.order,
  );

  function handleSlideChange(swiper: SwiperClass) {
    setCanScrollPrev(!swiper.isBeginning);
    setCanScrollNext(!swiper.isEnd);
  }

  function scrollPrev() {
    swiperRef.current?.slidePrev();
  }

  function scrollNext() {
    swiperRef.current?.slideNext();
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

  useEffect(() => {
    setCanScrollPrev(!swiperRef.current?.isBeginning);
    setCanScrollNext(!swiperRef.current?.isEnd);
  }, [menuCategories]);

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 2 }}>
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

      <Box sx={{ width: 1, overflow: "hidden" }}>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          keyboard
          mousewheel
          modules={[Keyboard, Mousewheel]}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            500: {
              slidesPerView: 3,
            },
            600: {
              slidesPerView: 4,
            },
            700: {
              slidesPerView: 5,
            },
            800: {
              slidesPerView: 6,
            },
          }}
        >
          <Stack component="nav" direction="row" sx={{ alignItems: "center" }}>
            {menuCategories.map((menuCategory) => (
              <SwiperSlide key={menuCategory.id}>
                <MenuCategoryNavigationSlide
                  menuCategory={menuCategory}
                  selectedMenuCategoryId={selectedMenuCategoryId}
                  onSlideClick={handleSlideClick}
                />
              </SwiperSlide>
            ))}
          </Stack>
        </Swiper>
      </Box>

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

      <IconButton
        onClick={() => setOpenMenuCategoryNavigationDialog(true)}
        color="inherit"
        sx={{
          bgcolor: grey[200],
          "&:hover": {
            bgcolor: grey[300],
          },
        }}
        size="small"
      >
        <FormatListBulletedIcon fontSize="small" />
      </IconButton>

      <MenuCategoryNavigationDialog
        menuCategories={menuCategories}
        openMenuCategoryNavigationDialog={openMenuCategoryNavigationDialog}
        setOpenMenuCategoryNavigationDialog={
          setOpenMenuCategoryNavigationDialog
        }
        onSlideClick={handleSlideClick}
      />
    </Stack>
  );
}
