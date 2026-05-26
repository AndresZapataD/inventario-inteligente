import { useEffect, useState } from "react";

import {
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button
} from "@mui/material";

import ProductoService from "../../services/ProductoService";

export default function ProductoSelector({
  productos,
  setProductos
}) {

  const [catalogo, setCatalogo] = useState([]);
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const loadProductos = async () => {
    try {
      const response = await ProductoService.getAll();

      // 🔥 seguridad: siempre array
      setCatalogo(Array.isArray(response) ? response : []);

    } catch (error) {
      console.error(error);
      setCatalogo([]);
    }
  };

  useEffect(() => {
    loadProductos();
  }, []);

  const handleAddProducto = () => {

    if (!productoId) return;

    const producto = catalogo.find(
      (p) => p.id === Number(productoId) // ✔ FIX IMPORTANTE
    );

    if (!producto) return;

    const nuevoProducto = {
      producto_id: producto.id,
      nombreProducto: producto.nombre,
      cantidad,
      precioUnitario: producto.precioVenta
    };

    setProductos([
      ...productos,
      nuevoProducto
    ]);

    setProductoId("");
    setCantidad(1);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>

      <Grid container spacing={2}>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            fullWidth
            label="Producto"
            value={productoId}
            onChange={(e) => setProductoId(e.target.value)}
          >
            {catalogo.map((producto) => (
              <MenuItem
                key={producto.id}
                value={producto.id}
              >
                {producto.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            type="number"
            label="Cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{ height: "100%" }}
            onClick={handleAddProducto}
          >
            Agregar
          </Button>
        </Grid>

      </Grid>

    </Paper>
  );
}