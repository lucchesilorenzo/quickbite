import { StrictMode } from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import { Buffer } from "buffer";
import { enGB } from "date-fns/locale";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import "leaflet/dist/leaflet.css";
import { createRoot } from "react-dom/client";
// @ts-ignore
import "react-leaflet-markercluster/styles";
// @ts-ignore
import "swiper/css/bundle";

import { ignoreFocusVisibleWarning } from "./lib/utils/warnings";
import AppRoutes from "./pages/AppRoutes";

import "@/lib/echo";
import "@/styles/globals.css";

window.Buffer = Buffer;

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
    MuiPickersTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "red",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: 4,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#ed6c02",
    },
  },
});

// Ignore ':focus-visible' warnings (caused by MUI TipTap)
ignoreFocusVisibleWarning();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      <NotificationsProvider
        slotProps={{
          snackbar: {
            anchorOrigin: { vertical: "top", horizontal: "right" },
            autoHideDuration: 8000,
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRoutes />
          </ThemeProvider>
        </LocalizationProvider>
      </NotificationsProvider>
    </QueryClientProvider>
  </StrictMode>,
);
