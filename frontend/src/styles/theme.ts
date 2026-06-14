import { createTheme } from "@mui/material";

export function createMuiTheme() {
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

  return theme;
}
