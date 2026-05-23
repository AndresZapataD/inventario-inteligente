import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Container
} from "@mui/material";

import { Eye, EyeOff } from "lucide-react";

import FooterLogin from "../components/FooterLogin";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const userData = {
        email,
        password
      };

      const data = await login(userData);

      console.log(data);

      alert("Login exitoso");

      navigate("/dashboard");


    } catch (error) {

      console.error(error);

      alert("Error al iniciar sesión");

    }
  };

  return (

    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        width: "100%",
        backgroundColor: "background.default"
      }}
    >

      {/* PANEL IZQUIERDO */}
      <Box
        sx={{
          display: {
            xs: "none",
            md: "flex"
          },

          width: "50%",

          position: "relative",

          overflow: "hidden",

          alignItems: "center",

          justifyContent: "center",

          p: 8,

          background: (theme) =>
            `linear-gradient(
              135deg,
              ${theme.palette.grey[950] || "#020617"} 0%,
              ${theme.palette.primary.dark} 100%
            )`
        }}
      >

        {/* Luces decorativas */}
        <Box
          sx={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            bgcolor: "info.main",
            opacity: 0.08,
            filter: "blur(100px)",
            top: -250,
            left: -200
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            bgcolor: "primary.main",
            opacity: 0.12,
            filter: "blur(100px)",
            bottom: -250,
            right: -200
          }}
        />

        {/* Contenido */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            maxWidth: 500
          }}
        >

          <Typography
            variant="overline"
            sx={{
              color: "info.light",
              fontWeight: 700,
              letterSpacing: "0.35em",
              mb: 3,
              display: "block"
            }}
          >
            INVENTARIO INTELIGENTE
          </Typography>

          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: "white",
              fontWeight: 900,
              lineHeight: 1.1,
              mb: 4
            }}
          >
            Gestiona tu negocio de forma moderna.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "grey.400",
              fontSize: "1.1rem",
              lineHeight: 1.8
            }}
          >
            Controla productos, ventas, clientes y movimientos de inventario
            desde una plataforma elegante, rápida y segura.
          </Typography>

        </Box>

      </Box>

      {/* PANEL DERECHO */}
      <Box
        sx={{
          width: {
            xs: "100%",
            md: "50%"
          },

          display: "flex",

          flexDirection: "column",

          justifyContent: "space-between",

          alignItems: "center",

          backgroundColor: "background.paper",

          py: 4,

          px: {
            xs: 3,
            sm: 6
          }
        }}
      >

        {/* Espaciador */}
        <Box />

        {/* FORMULARIO */}
        <Container
          maxWidth="sm"
          sx={{
            width: "100%"
          }}
        >

          {/* Header */}
          <Box sx={{ mb: 5 }}>

            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 900,
                color: "text.primary",
                mb: 1
              }}
            >
              Iniciar sesión
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary"
              }}
            >
              Bienvenido de nuevo. Introduce tus credenciales.
            </Typography>

          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3
            }}
          >

            {/* EMAIL */}
            <TextField
              label="Correo electrónico"
              type="email"
              variant="outlined"
              fullWidth
              required
              placeholder="correo@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* PASSWORD */}
            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">

                      <IconButton
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        edge="end"
                      >
                        {
                          showPassword
                            ? <EyeOff size={20} />
                            : <Eye size={20} />
                        }
                      </IconButton>

                    </InputAdornment>
                  )
                }
              }}
            />

            
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                mt: 1,

                py: 1.7,

                borderRadius: 3,

                fontWeight: 700,

                fontSize: "1rem",

                textTransform: "none",

                boxShadow: 4
              }}
            >
              Entrar
            </Button>

          </Box>

        </Container>

        
        <FooterLogin />

      </Box>

    </Box>
  );
}

export default Login;