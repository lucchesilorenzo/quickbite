import { CSSProperties } from "react";

declare module "@mui/material/styles" {
  interface Components {
    MuiPickersTextField?: {
      styleOverrides?: {
        root?: CSSProperties;
      };
    };
  }
}
