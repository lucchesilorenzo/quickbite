import { Box, Button, Stack, Typography } from "@mui/material";

type MenuItemsEmptyProps = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function MenuItemsEmpty({ setSearchTerm }: MenuItemsEmptyProps) {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        pb: 4,
      }}
    >
      <Box
        component="img"
        src="/no-results.png"
        alt="No results"
        sx={{ height: 150 }}
      />

      <Typography
        component="h2"
        variant="h5"
        sx={{ fontWeight: 700 }}
        gutterBottom
      >
        That's not on the menu
      </Typography>

      <Typography component="h4" variant="body1">
        Try something else?
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" onClick={() => setSearchTerm("")}>
          Back to menu
        </Button>
      </Box>
    </Stack>
  );
}
