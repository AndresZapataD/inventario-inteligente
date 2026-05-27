import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ClienteService from "../services/clienteService.js";
import Navbar from "../components/NavBar.jsx";

import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function Clientes() {

  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    cargarClientes();
  }, []);

  // Filtrar clientes cada vez que cambia el filtro
  useEffect(() => {
    if (!filtro.trim()) {
      setClientesFiltrados(clientes);
    } else {
      const filtroLower = filtro.toLowerCase();
      const filtrados = clientes.filter(cliente =>
        (cliente.documento && cliente.documento.toLowerCase().includes(filtroLower)) ||
        (cliente.nombre && cliente.nombre.toLowerCase().includes(filtroLower)) ||
        (cliente.apellido && cliente.apellido.toLowerCase().includes(filtroLower)) ||
        (cliente.empresa && cliente.empresa.toLowerCase().includes(filtroLower))
      );
      setClientesFiltrados(filtrados);
    }
  }, [filtro, clientes]);

  const cargarClientes = async () => {
    try {

      setLoading(true);

      const data = await ClienteService.getAll();

      setClientes(data);

    } catch (error) {

      console.error("Error al cargar clientes:", error);

    } finally {

      setLoading(false);

    }
  };

const eliminarCliente = async (id) => {

  const confirmar = window.confirm(
    "¿Estás seguro de eliminar este cliente?\n\n" +
    "Este cliente está asociado a ventas.\n" +
    "Si lo eliminas, esas ventas quedarán como ventas anónimas y se perderá la relación con el cliente."
  );

  if (!confirmar) {
    return;
  }

  try {

    await ClienteService.delete(id);

    setClientes(
      clientes.filter(cliente => cliente.id !== id)
    );

    alert("Cliente eliminado correctamente. Las ventas asociadas quedaron como anónimas.");

  } catch (error) {

    console.error("Error al eliminar cliente:", error);

    alert("No se pudo eliminar el cliente.");

  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fa"
      }}
    >

      <Navbar />

      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: 4
        }}
      >

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2
          }}
        >

          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#111827"
              }}
            >
              Clientes
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#6b7280",
                mt: 0.5
              }}
            >
              Gestión de clientes registrados
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={() => navigate("/clientes/nuevo")}
            sx={{
              textTransform: "none",
              borderRadius: 3,
              px: 3,
              py: 1.2,
              fontWeight: 600
            }}
          >
            Nuevo Cliente
          </Button>

        </Box>

        {/* Filtro de búsqueda */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="🔍 Buscar por documento, nombre o empresa..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#6b7280", mr: 1 }} />
                </InputAdornment>
              )
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#ffffff",
                "&:hover fieldset": {
                  borderColor: "#667eea"
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#667eea"
                }
              }
            }}
          />
          {filtro && (
            <Typography
              variant="caption"
              sx={{ color: "#6b7280", mt: 1, display: "block" }}
            >
              Se encontraron {clientesFiltrados.length} cliente(s)
            </Typography>
          )}
        </Box>

        {loading ? (

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 10
            }}
          >
            <CircularProgress />
          </Box>

        ) : (

          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              border: "1px solid #e5e7eb"
            }}
          >

            <TableContainer
              sx={{
                width: "100%",
                overflowX: "auto"
              }}
            >

              <Table sx={{ minWidth: 1200 }}>

                <TableHead>

                  <TableRow
                    sx={{
                      bgcolor: "#f9fafb"
                    }}
                  >

                    <TableCell sx={{ fontWeight: 700 }}>
                      Documento
                    </TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>
                      Nombre
                    </TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>
                      Apellido
                    </TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>
                      Correo
                    </TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>
                      Teléfono
                    </TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>
                      Dirección
                    </TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>
                      Empresa
                    </TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>
                      Acciones
                    </TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>

                  {clientesFiltrados.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} sx={{ textAlign: "center", py: 3 }}>
                        <Typography color="textSecondary">
                          {filtro ? "No se encontraron clientes" : "No hay clientes registrados"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    clientesFiltrados.map((cliente) => (

                    <TableRow
                      key={cliente.id}
                      hover
                    >

                      <TableCell>
                        {cliente.documento}
                      </TableCell>

                      <TableCell>
                        {cliente.nombre}
                      </TableCell>

                      <TableCell>
                        {cliente.apellido}
                      </TableCell>

                      <TableCell>
                        {cliente.correo}
                      </TableCell>

                      <TableCell>
                        {cliente.telefono}
                      </TableCell>

                      <TableCell>
                        {cliente.direccion}
                      </TableCell>

                      <TableCell>
                        {cliente.empresa}
                      </TableCell>

                      <TableCell>

                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            navigate(`/clientes/${cliente.id}/editar`)
                          }
                          sx={{
                            textTransform: "none",
                            borderRadius: 2
                          }}
                        >
                          Editar
                        </Button>
                       

                       <Button
  variant="outlined"
  size="small"
  onClick={() => eliminarCliente(cliente.id)}
  sx={{
    textTransform: "none",
    borderRadius: 2,
    ml: 1,
    borderColor: "#e53e3e",
    color: "#e53e3e",
    "&:hover": {
      borderColor: "#c53030",
      color: "#c53030",
      backgroundColor: "#fff5f5"
    }
  }}
>
  Eliminar
</Button>

                      </TableCell>

                    </TableRow>
                    ))
                  )}

                </TableBody>

              </Table>

            </TableContainer>

          </Paper>

        )}

      </Box>

    </Box>
  );
}