import { useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, Fade, Stack, Typography } from "@mui/material";

import { Category } from "@/types";

type CategoryFilterSlideProps = {
  category: Category;
  onStatusChange: (category: Category) => void;
};

export default function CategoryFilterSlide({
  category,
  onStatusChange,
}: CategoryFilterSlideProps) {
  const [isTickVisible, setIsTickVisible] = useState(false);

  return (
    <Box sx={{ scrollSnapAlign: "center", pl: 2 }}>
      <Button
        onClick={() => onStatusChange(category)}
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
          src={category.image}
          alt={category.name}
          sx={{
            bgcolor: "#ed6c02",
            maxWidth: 110,
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
