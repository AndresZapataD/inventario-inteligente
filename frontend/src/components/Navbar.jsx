import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar
} from "@mui/material";
import {
  Menu as MenuIcon,
  X as CloseIcon,
  LayoutDashboard,
  Users,
  Package,
  Settings,
} from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Clientes", icon: <Users size={20} />, path: "/clientes" },
    { name: "Inventario", icon: <Package size={20} />, path: "/inventario" },
    { name: "Configuración", icon: <Settings size={20} />, path: "/configuracion" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ width: 260, height: "100%", display: "flex", flexDirection: "column", bgcolor: "background.paper", pt: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, pb: 2, borderBottom: 1, borderColor: "divider" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{ bgcolor: "primary.main", fontWeight: "bold", width: 36, height: 36 }}>I</Avatar>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "text.primary" }}>Inventario</Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} edge="end" sx={{ color: "text.secondary" }}>
          <CloseIcon size={20} />
        </IconButton>
      </Box>
      <List sx={{ px: 1, mt: 2 }}>
        {links.map((link) => (
          <ListItem key={link.name} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component="a"
              href={link.path}
              onClick={handleDrawerToggle}
              sx={{ borderRadius: 2, color: "text.secondary", "&:hover": { bgcolor: "action.hover", color: "text.primary" } }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>{link.icon}</ListItemIcon>
              <ListItemText primary={link.name} primaryTypographyProps={{ variant: "body2", fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          bgcolor: "background.paper", 
          borderBottom: 1, 
          borderColor: "divider",
          color: "text.primary",
          width: "100%"
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 }, py: 1, display: "flex", alignItems: "center" }}>
          
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "text.primary", color: "background.paper", fontWeight: "bold", width: 40, height: 40 }}>
              I
            </Avatar>
            <Box>
              <Typography variant="h6" component="h1" sx={{ color: "text.primary", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.2 }}>
                Inventario Inteligente
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                Gestión empresarial
              </Typography>
            </Box>
          </Box>

          
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {links.map((link) => (
              <Button
                key={link.name}
                component="a"
                href={link.path}
                startIcon={link.icon}
                variant="text"
                sx={{
                  color: "text.secondary",
                  textTransform: "none",
                  fontWeight: 500,
                  px: 2,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "action.hover", color: "text.primary" },
                }}
              >
                {link.name}
              </Button>
            ))}
          </Box>

          
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "flex", md: "none" }, color: "text.primary" }}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 260 },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}