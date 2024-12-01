"use client";

import { Box, Typography, Button, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import theme from "../../config/theme";

const UnderConstructionPage = () => {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          px: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="h4"
            color="primary"
            sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
          >
            Under Construction
          </Typography>

          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            sx={{ mb: 3 }}
          >
            This page is currently under construction. Please check back later.
          </Typography>

          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                fontSize: "16px",
                mb: 2,
              }}
              onClick={() => router.push("/")}
            >
              Go to Home
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UnderConstructionPage;
