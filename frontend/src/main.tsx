import { StrictMode } from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import "leaflet/dist/leaflet.css";
import { CookiesProvider } from "react-cookie";
import { createRoot } from "react-dom/client";
// @ts-ignore
import "react-leaflet-markercluster/styles";

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
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
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
      </CookiesProvider>
    </QueryClientProvider>
  </StrictMode>,
);
