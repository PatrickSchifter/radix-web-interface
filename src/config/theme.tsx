"use client";
import { Poppins } from "next/font/google";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    terciary: Palette["primary"];
  }

  interface PaletteOptions {
    terciary?: PaletteOptions["primary"];
  }
}

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const fontFamily = poppins.style.fontFamily;

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#331e50",
    },
    secondary: {
      main: "#b3d345",
    },
    terciary: {
      main: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#331e50",
      secondary: "#b3d345",
    },
    divider: "#331e50",
  },
  typography: {
    fontFamily,
    button: {
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
