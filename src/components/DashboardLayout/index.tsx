"use client";

import React from "react";
import { Box } from "@mui/material";
import SideBar from "../Sidebar";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar fixa */}
      <SideBar />

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
