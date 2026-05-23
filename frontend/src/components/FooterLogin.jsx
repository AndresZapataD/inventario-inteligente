import { Box, Typography } from "@mui/material";

function FooterLogin() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        mt: 4
      }}
    >
      <Typography
        variant="body2"
        align="center"
        sx={{
          color: "text.disabled"
        }}
      >
        &copy; 2026 Inventario Inteligente. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}

export default FooterLogin;