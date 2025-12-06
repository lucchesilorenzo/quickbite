import { useEffect, useRef, useState } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Fade, IconButton, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useMenu } from "@partner/contexts/MenuProvider";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useGetMenu } from "@partner/hooks/restaurants/menu/useGetMenu";
import { menuDefaults } from "@partner/lib/query-defaults";
import { useSearchParams } from "react-router-dom";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import AddMenuItemButton from "./AddMenuItemButton";

import Spinner from "@/components/common/Spinner";
import MenuCategoryNavigationSlide from "@/components/menu-category-navigation/MenuCategoryNavigationSlide";
import ShowMoreMenuCategoriesButton from "@/components/menu-category-navigation/ShowMoreMenuCategoriesButton";

export default function MenuEditNavigation() {
  const { restaurant } = useRestaurant();
  const { selectedMenuCategoryId, setSelectedMenuCategoryId } = useMenu();

  const {
    data: menuCategories = menuDefaults,
    isLoading: isLoadingMenuCategories,
  } = useGetMenu({ restaurantId: restaurant.id });

  const swiperRef = useRef<SwiperClass>(null);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  function updateScrollButtons(swiper: SwiperClass) {
    setCanScrollPrev(!swiper.isBeginning);
    setCanScrollNext(!swiper.isEnd);
  }

  function handleSlideClick(menuCategoryId: string) {
    setSelectedMenuCategoryId(menuCategoryId);
    setSearchParams({ menu_category_id: menuCategoryId }, { replace: true });
  }

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
