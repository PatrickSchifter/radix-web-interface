"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../config/theme";

const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          textAlign: "center",
          px: 3,
        }}
      >
        <Box>
          <Typography variant="h3" color="primary" gutterBottom>
            Welcome to Radix Web Interface
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            This is only the beginning! 🚀
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href="/auth/login"
            sx={{ mt: 3 }}
          >
            Go to Login
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
