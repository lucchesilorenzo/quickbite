import { useEffect, useRef, useState } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Fade, IconButton, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSearchParams } from "react-router-dom";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import ShowMoreMenuCategoriesButton from "../../../../common/menu-category-navigation/ShowMoreMenuCategoriesButton";

import MenuCategoryNavigationSlide from "@/components/common/menu-category-navigation/MenuCategoryNavigationSlide";
import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import { usePartnerRestaurantMenu } from "@/hooks/contexts/usePartnerRestaurantMenu";

export default function PartnerMenuEditNavigation() {
  const { restaurant } = usePartnerRestaurant();
  const { selectedMenuCategoryId, setSelectedMenuCategoryId } =
    usePartnerRestaurantMenu();

  const swiperRef = useRef<SwiperClass>(null);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

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
    setSearchParams(
      { menu_category_id: menuCategoryId },
      {
        replace: true,
      },
    );
  }

  useEffect(() => {
    setCanScrollPrev(!swiperRef.current?.isBeginning);
    setCanScrollNext(!swiperRef.current?.isEnd);
  }, [restaurant.menu_categories]);

  useEffect(() => {
    const menuCategoryId = searchParams.get("menu_category_id");

    if (menuCategoryId) {
      const menuCategory = restaurant.menu_categories.find(
        (menuCategory) => menuCategory.id === menuCategoryId,
      );

      if (menuCategory) {
        setSelectedMenuCategoryId(menuCategory.id);
      }
    }
  }, [searchParams, restaurant.menu_categories, setSelectedMenuCategoryId]);

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
            {restaurant.menu_categories.map((menuCategory) => (
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

      <ShowMoreMenuCategoriesButton
        menuCategories={restaurant.menu_categories}
        onSlideClick={handleSlideClick}
      />
    </Stack>
  );
}
