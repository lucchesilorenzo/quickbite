import { StrictMode } from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import "leaflet-geosearch/dist/geosearch.css";
import { createRoot } from "react-dom/client";

import AppRoutes from "./pages/AppRoutes";

import "@/styles/globals.css";

const queryClient = new QueryClient();

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  palette: {
    primary: {
      main: "#ed6c02",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NotificationsProvider
        slotProps={{
          snackbar: {
            anchorOrigin: { vertical: "top", horizontal: "right" },
            autoHideDuration: 5000,
          },
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <AppRoutes />
        </ThemeProvider>
      </NotificationsProvider>
    </QueryClientProvider>
  </StrictMode>,
);
