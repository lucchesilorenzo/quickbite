import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Keyboard, Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import WhyChooseUsFeatureSlideMobile from "./WhyChooseUsFeatureSlideMobile";

import { whyChooseUsFeatures } from "@/lib/data";

export default function WhyChooseUsFeatureMobile() {
  return (
    <Box
      sx={{
        width: 1,
        overflow: "hidden",
        display: { xs: "flex", lg: "none" },
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
        {whyChooseUsFeatures.map((feature) => (
          <SwiperSlide key={feature.title}>
            <WhyChooseUsFeatureSlideMobile feature={feature} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
