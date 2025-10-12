import { useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, Fade, Stack, Typography } from "@mui/material";

import { useCategoryFilters } from "@/contexts/public/CategoryFiltersProvider";
import env from "@/lib/env";
import { CategoryWithSelected } from "@/types";

type CategoryFilterSlideProps = {
  category: CategoryWithSelected;
};

export default function CategoryFilterSlide({
  category,
}: CategoryFilterSlideProps) {
  const { handleStatusChange } = useCategoryFilters();

  const [isTickVisible, setIsTickVisible] = useState(false);

  return (
    <Box>
      <Button
        onClick={() => handleStatusChange(category)}
        onMouseEnter={() => setIsTickVisible(true)}
        onMouseLeave={() => setIsTickVisible(false)}
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          textTransform: "none",
        }}
      >
        <Box
          component="img"
          src={`${env.VITE_BASE_URL}${category.image}`}
          alt={category.name}
          sx={{
            width: 120,
            height: 80,
            borderRadius: 2,
            objectFit: "contain",
          }}
        />

        <Stack direction="row" spacing={1}>
          <Fade
            in={category.selected || isTickVisible}
            unmountOnExit // Unmounts the component when not visible from the DOM
            timeout={{ exit: 300 }}
          >
            <CheckIcon fontSize="small" color="action" />
          </Fade>

          <Typography
            component="span"
            variant="body2"
            color={category.selected ? "success" : "textPrimary"}
          >
            {category.name}
          </Typography>
        </Stack>
      </Button>
    </Box>
  );
}
