import { useEffect, useState, useMemo } from "react";

import Navbar from "../../components/Navbar.jsx";

import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Alert
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import VentaService from "../../services/ventaService";

import VentaFilters from "../../components/ventas/VentaFilters";
import VentaTable from "../../components/ventas/VentaTable";

export default function VentaList() {

  const navigate = useNavigate();

  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    estado: "",
    fechaInicio: "",
    fechaFin: ""
  });

  const loadVentas = async () => {

    try {
      setLoading(true);
      const response = await VentaService.getAll();
      setVentas(response);

    } catch (error) {

      console.error(error);

    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {

    loadVentas();

  }, []);

  // Aplicar filtros a las ventas
  const ventasFiltradas = useMemo(() => {
    return ventas.filter((venta) => {
      // Filtro de búsqueda - busca en cliente o ID
      if (filters.search && filters.search.trim() !== "") {
        const search = filters.search.toLowerCase().trim();
        const clienteName = (venta.Cliente?.nombre || "").toLowerCase();
        const ventaId = (venta.id || "").toString();
        const coincide = clienteName.includes(search) || ventaId.includes(search);
        if (!coincide) {
          return false;
        }
      }

      // Filtro de estado
      if (filters.estado && filters.estado.trim() !== "") {
        if (venta.estado !== filters.estado) {
          return false;
        }
      }

      // Filtro de fecha inicio
      if (filters.fechaInicio && filters.fechaInicio.trim() !== "") {
        const fechaVenta = new Date(venta.createdAt).toISOString().split("T")[0];
        if (fechaVenta < filters.fechaInicio) {
          return false;
        }
      }

      // Filtro de fecha fin
      if (filters.fechaFin && filters.fechaFin.trim() !== "") {
        const fechaVenta = new Date(venta.createdAt).toISOString().split("T")[0];
        if (fechaVenta > filters.fechaFin) {
          return false;
        }
      }

      return true;
    });
  }, [ventas, filters]);

  return (

    <>
    
      <Navbar />

      <Box sx={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
        mb: 3
      }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 3 }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
              📊 Gestión de Ventas
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/ventas/nueva")}
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "#fff",
                color: "#667eea",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#f0f0f0"
                }
              }}
            >
              Nueva Venta
            </Button>

          </Stack>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, pb: 4 }}>

        <Paper sx={{ 
          p: 3, 
          mb: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 2
        }}>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
            🔍 Filtros de búsqueda
          </Typography>

          <VentaFilters
            filters={filters}
            setFilters={setFilters}
          />

        </Paper>

        {ventas.length === 0 && !loading ? (
          <Alert severity="info">
            No hay ventas registradas. ¡Crea la primera venta!
          </Alert>
        ) : (
          <Paper sx={{ 
            p: 3,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: 2
          }}>
            
            <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                Total de ventas: <span style={{ color: "#667eea" }}>{ventasFiltradas.length}</span> de {ventas.length}
              </Typography>
            </Box>

            <VentaTable ventas={ventasFiltradas} onVentasUpdate={loadVentas} />

          </Paper>
        )}

      </Box>

    </>

  );

}