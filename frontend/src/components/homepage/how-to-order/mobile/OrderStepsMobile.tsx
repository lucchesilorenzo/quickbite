import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Keyboard, Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import OrderStepsSlideMobile from "./OrderStepsSlideMobile";

import { orderSteps } from "@/lib/constants/marketing";

export default function OrderStepsMobile() {
  return (
    <Box
      sx={{
        width: 1,
        overflow: "hidden",
        display: { xs: "block", lg: "none" },
        ".swiper-pagination-bullet": {
          backgroundColor: grey[800],
          opacity: 1,
        },
        ".swiper-pagination-bullet-active": {
          backgroundColor: "#ed6c02",
        },
      }}
    >
      <Swiper
        slidesPerView={1}
        centeredSlides
        pagination={{ clickable: true }}
        mousewheel
        keyboard
        modules={[Pagination, Mousewheel, Keyboard]}
        style={{ paddingBottom: "60px" }}
      >
        {orderSteps.map((step) => (
          <SwiperSlide key={step.title}>
            <OrderStepsSlideMobile step={step} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
