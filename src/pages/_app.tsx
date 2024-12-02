import { AppProps } from "next/app";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import theme from "../config/theme";
import StoreProvider from "../providers/StoreProvider";
import ModalProvider from "../providers/ModalProvider";
import { useRouter } from "next/router";
import SideBar from "../components/Sidebar";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isDashboard = router.pathname.startsWith("/dashboard");

  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ModalProvider />
        {isDashboard ? (
          <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <SideBar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                bgcolor: "background.default",
                color: "text.primary",
              }}
            >
              <Component {...pageProps} />
            </Box>
          </Box>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </StoreProvider>
  );
}
