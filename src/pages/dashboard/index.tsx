// src/pages/dashboard/index.tsx

import React from "react";
import { Box, Typography } from "@mui/material";

const DashboardHome: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "primary.main",
          mb: 2,
        }}
      >
        Welcome to the Dashboard
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
        }}
      >
        Use the menu on the left to navigate through the features.
      </Typography>
    </Box>
  );
};

export default DashboardHome;
