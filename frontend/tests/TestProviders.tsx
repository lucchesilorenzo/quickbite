import { createTheme, ThemeProvider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { enGB } from "date-fns/locale";

type TestProvidersProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const theme = createTheme();

export default function TestProviders({ children }: TestProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}
