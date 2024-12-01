// src/pages/_app.tsx

import { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../config/theme";
import StoreProvider from "../providers/StoreProvider"; // Certifique-se de que o StoreProvider está sendo importado corretamente
import ModalProvider from "../providers/ModalProvider";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ModalProvider />
        <Component {...pageProps} />
      </ThemeProvider>
    </StoreProvider>
  );
}
