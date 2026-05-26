import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Paper
} from "@mui/material";

import ClienteService from "../../services/ClienteService";
import VentaService from "../../services/VentaService";

import ProductoSelector from "../../components/ventas/ProductoSelector";
import CarritoVenta from "../../components/ventas/CarritoVenta";
import ResumenVenta from "../../components/ventas/ResumenVenta";

export default function VentaForm() {

  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  const [form, setForm] = useState({
    cliente_id: "",
    metodoPago: "EFECTIVO",
    observacion: ""
  });

  // ✅ CARGA SEGURA DE CLIENTES
  const loadClientes = async () => {
    try {
      const response = await ClienteService.getAll();

      const data = Array.isArray(response)
        ? response
        : response?.data || [];

      setClientes(data);

    } catch (error) {
      console.error("ERROR CLIENTES:", error);
      setClientes([]);
    }
  };

  useEffect(() => {
    loadClientes();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {

      if (productos.length === 0) {
        alert("Agrega productos antes de guardar la venta");
        return;
      }

      const payload = {
        ...form,
        usuario_id: "a3b58936-4bbd-4d70-92ab-325a48db86da",
        productos
      };

      await VentaService.create(payload);

      alert("Venta creada correctamente");

      setProductos([]);

      setForm({
        cliente_id: "",
        metodoPago: "EFECTIVO",
        observacion: ""
      });

    } catch (error) {
      console.error(error);
      alert("Error creando venta");
    }
  };

  return (
    <Box p={3}>

      <Typography variant="h4" mb={3}>
        Nueva Venta
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>

        <Grid container spacing={2}>

          {/* CLIENTE */}
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Cliente"
              name="cliente_id"
              value={form.cliente_id}
              onChange={handleChange}
            >
              {(clientes || []).map((cliente) => (
                <MenuItem
                  key={cliente.id}
                  value={cliente.id}
                >
                  {cliente.nombre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* MÉTODO PAGO */}
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Método Pago"
              name="metodoPago"
              value={form.metodoPago}
              onChange={handleChange}
            >
              <MenuItem value="EFECTIVO">EFECTIVO</MenuItem>
              <MenuItem value="TARJETA_CREDITO">TARJETA</MenuItem>
              <MenuItem value="TRANSFERENCIA">TRANSFERENCIA</MenuItem>
            </TextField>
          </Grid>

          {/* OBSERVACIÓN */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Observación"
              name="observacion"
              value={form.observacion}
              onChange={handleChange}
            />
          </Grid>

        </Grid>

      </Paper>

      <ProductoSelector
        productos={productos}
        setProductos={setProductos}
      />

      <CarritoVenta
        productos={productos}
        setProductos={setProductos}
      />

      <ResumenVenta productos={productos} />

      <Button
        variant="contained"
        size="large"
        onClick={handleSave}
      >
        Guardar Venta
      </Button>

    </Box>
  );
}