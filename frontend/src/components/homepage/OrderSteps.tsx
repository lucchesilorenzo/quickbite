import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
// @ts-ignore
import "swiper/css/bundle";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { orderSteps } from "@/lib/data";

export default function OrderSteps() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <>
      <Stack
        direction="row"
        spacing={4}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        {orderSteps.map((step) => (
          <Stack
            key={step.title}
            spacing={1}
            sx={{
              alignItems: "center",
              textAlign: "center",
              maxWidth: 300,
            }}
          >
            <step.icon color="primary" fontSize="large" />

            <Typography variant="h6" component="h5" sx={{ fontWeight: "700" }}>
              {step.title}
            </Typography>

            <Typography variant="body2" component="p">
              {step.subtitle}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Box
        sx={{
          display: {
            xs: "flex",
            md: "none",
          },
          "--swiper-pagination-color": "#ed6c02",
        }}
      >
        <Swiper
          slidesPerView="auto"
          centeredSlides={true}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {orderSteps.map((step) => (
            <SwiperSlide key={step.title}>
              <Stack
                key={step.title}
                spacing={1}
                sx={{
                  alignItems: "center",
                  textAlign: "center",
                  pb: 6,
                }}
              >
                <step.icon color="primary" fontSize="large" />

                <Typography
                  variant={isMobile ? "body1" : "h6"}
                  component="h5"
                  sx={{ fontWeight: "700" }}
                >
                  {step.title}
                </Typography>

                <Typography variant="body2" component="p">
                  {step.subtitle}
                </Typography>
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
