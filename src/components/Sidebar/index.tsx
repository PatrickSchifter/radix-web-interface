import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

const SideBar: React.FC = () => {
  const router = useRouter();

  const menuItems = [
    { label: "Sensor Reading", path: "/dashboard/sensor-reading" },
    { label: "Equipment", path: "/dashboard/equipment" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          bgcolor: "primary.main",
          color: "terciary.main",
        },
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{ textAlign: "center", py: 2, fontWeight: "bold" }}
      >
        Dashboard
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            sx={{
              "&:hover": {
                bgcolor: "secondary.main",
                color: "primary.main",
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
