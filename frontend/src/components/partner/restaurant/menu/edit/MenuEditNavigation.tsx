import { useEffect, useRef, useState } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Fade, IconButton, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSearchParams } from "react-router-dom";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import ShowMoreMenuCategoriesButton from "../../../../common/menu-category-navigation/ShowMoreMenuCategoriesButton";
import AddMenuItemButton from "./AddMenuItemButton";

import Spinner from "@/components/common/Spinner";
import MenuCategoryNavigationSlide from "@/components/common/menu-category-navigation/MenuCategoryNavigationSlide";
import { usePartnerMenu } from "@/hooks/contexts/private/partner/usePartnerMenu";
import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";
import { useGetPartnerRestaurantMenu } from "@/hooks/react-query/private/partner/restaurants/menu/useGetPartnerRestaurantMenu";
import { partnerMenuDefaults } from "@/lib/query-defaults";

export default function MenuEditNavigation() {
  const { restaurant } = usePartnerRestaurant();
  const { selectedMenuCategoryId, setSelectedMenuCategoryId } =
    usePartnerMenu();

  const {
    data: menuCategories = partnerMenuDefaults,
    isLoading: isLoadingMenuCategories,
  } = useGetPartnerRestaurantMenu(restaurant.id);

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
  }, [menuCategories]);

  useEffect(() => {
    const menuCategoryId = searchParams.get("menu_category_id");

    if (menuCategoryId) {
      const menuCategory = menuCategories.find(
        (menuCategory) => menuCategory.id === menuCategoryId,
      );

      if (menuCategory) {
        setSelectedMenuCategoryId(menuCategory.id);
      }
    }
  }, [searchParams, menuCategories, setSelectedMenuCategoryId]);

  if (isLoadingMenuCategories) return <Spinner />;

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 3 }}>
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
          spaceBetween={16}
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
          {menuCategories.map((menuCategory) => (
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

      {selectedMenuCategoryId && <AddMenuItemButton />}

      {menuCategories.length > 0 && (
        <ShowMoreMenuCategoriesButton
          menuCategories={menuCategories}
          onSlideClick={handleSlideClick}
        />
      )}
    </Stack>
  );
}
