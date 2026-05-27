import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Stack,
  Autocomplete
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import NavbarComponent from "../../components/Navbar";

import ClienteService from "../../services/clienteService";
import VentaService from "../../services/ventaService";
import productoService from "../../services/productoService";

export default function VentaForm() {

  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = !!id;

  const [clientes, setClientes] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [productosSelecionados, setProductosSelecionados] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [openProductoDialog, setOpenProductoDialog] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidadProducto, setCantidadProducto] = useState(1);

  const [form, setForm] = useState({
    cliente_id: "",
    metodoPago: "EFECTIVO",
    estado: "PENDIENTE",
    impuesto: 0,
    descuento: 0,
    observacion: ""
  });

  // Cargar clientes
  const loadClientes = async () => {
    try {
      const response = await ClienteService.getAll();
      const data = Array.isArray(response) ? response : response?.data || [];
      setClientes(data);
    } catch (error) {
      console.error("ERROR CLIENTES:", error);
      setClientes([]);
    }
  };

  // Cargar productos disponibles
  const loadProductos = async () => {
    try {
      const response = await productoService.getAll();
      const data = Array.isArray(response) ? response : response?.data || [];
      setProductosDisponibles(data);
    } catch (error) {
      console.error("ERROR PRODUCTOS:", error);
    }
  };

  // Cargar venta existente si es edición
const loadVenta = async () => {

  if (!esEdicion) return;

  try {

    setLoading(true);

    const response = await VentaService.getById(id);

    console.log("VENTA RESPONSE:", response);

    // Algunas APIs devuelven { venta: {...} }
    // otras devuelven directamente la venta
    const venta = response.venta || response;

    // =====================================
    // CARGAR FORMULARIO
    // =====================================

    setForm({

      cliente_id: venta.cliente_id || "",

      metodoPago:
        venta.metodoPago || "EFECTIVO",

      estado:
        venta.estado || "PENDIENTE",

      impuesto:
        Number(venta.impuesto) || 0,

      descuento:
        Number(venta.descuento) || 0,

      observacion:
        venta.observacion || ""

    });

    // =====================================
    // OBTENER DETALLES
    // =====================================

    const detalles =
      venta.DetalleVentas ||
      venta.detalleVentas ||
      venta.detalles ||
      venta.DetalleVenta ||
      [];

    console.log("DETALLES:", detalles);

    // =====================================
    // CARGAR PRODUCTOS
    // =====================================

    setProductosSelecionados(

      detalles.map(detalle => ({

        id:
          detalle.producto_id,

        nombre:
          detalle.nombreProducto ||
          detalle.Producto?.nombre ||
          "Producto",

        precioVenta:
          Number(detalle.precioUnitario) ||
          Number(detalle.Producto?.precioVenta) ||
          0,

        cantidad:
          Number(detalle.cantidad) || 1,

        subtotal:
          Number(detalle.subtotal) || 0

      }))

    );

  } catch (error) {

    console.error("ERROR CARGANDO VENTA:", error);

    alert("Error al cargar la venta");

  } finally {

    setLoading(false);

  }

};

  useEffect(() => {
    loadClientes();
    loadProductos();
    loadVenta();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleClienteChange = (event, value) => {
    setForm({
      ...form,
      cliente_id: value ? value.id : ""
    });
  };

  const abrirDialogoProducto = () => {
    setProductoSeleccionado(null);
    setCantidadProducto(1);
    setOpenProductoDialog(true);
  };

  const cerrarDialogoProducto = () => {
    setOpenProductoDialog(false);
    setProductoSeleccionado(null);
    setCantidadProducto(1);
  };

  const agregarProducto = () => {
    if (!productoSeleccionado) {
      alert("Selecciona un producto");
      return;
    }

    if (cantidadProducto <= 0) {
      alert("La cantidad debe ser mayor a 0");
      return;
    }

    // Verificar si el producto ya existe
    const productoExistente = productosSelecionados.find(p => p.id === productoSeleccionado.id);
    
    if (productoExistente) {
      // Actualizar cantidad si ya existe
      setProductosSelecionados(productosSelecionados.map(p => 
        p.id === productoSeleccionado.id 
          ? {
              ...p, 
              cantidad: p.cantidad + parseInt(cantidadProducto),
              subtotal: (p.cantidad + parseInt(cantidadProducto)) * p.precioVenta
            }
          : p
      ));
    } else {
      // Agregar nuevo producto
      setProductosSelecionados([
        ...productosSelecionados,
        {
          id: productoSeleccionado.id,
          nombre: productoSeleccionado.nombre,
          precioVenta: parseFloat(productoSeleccionado.precioVenta),
          cantidad: parseInt(cantidadProducto),
          subtotal: parseInt(cantidadProducto) * parseFloat(productoSeleccionado.precioVenta)
        }
      ]);
    }

    cerrarDialogoProducto();
  };

  const quitarProducto = (productoId) => {
    setProductosSelecionados(productosSelecionados.filter(p => p.id !== productoId));
  };
  const actualizarProducto = (productoId, campo, valor) => {

  setProductosSelecionados(prev =>
    prev.map(producto => {

      if (producto.id !== productoId) {
        return producto;
      }

      const actualizado = {
        ...producto,
        [campo]: valor
      };

      actualizado.subtotal =
        actualizado.cantidad * actualizado.precioVenta;

      return actualizado;

    })
  );

};

  const calcularTotal = () => {
    const subtotal = productosSelecionados.reduce((acc, p) => acc + p.subtotal, 0);
    const impuestoMonto = (subtotal * parseFloat(form.impuesto || 0)) / 100;
    const descuentoMonto = (subtotal * parseFloat(form.descuento || 0)) / 100;
    return subtotal + impuestoMonto - descuentoMonto;
  };

  const calcularSubtotal = () => {
    return productosSelecionados.reduce((acc, p) => acc + p.subtotal, 0);
  };

  const handleSave = async () => {
    try {
      if (!form.cliente_id) {
        alert("Selecciona un cliente");
        return;
      }

      if (productosSelecionados.length === 0) {
        alert("Agrega al menos un producto");
        return;
      }

      const payload = {
        cliente_id: form.cliente_id,
        metodoPago: form.metodoPago,
        estado: form.estado,
        impuesto: parseFloat(form.impuesto || 0),
        descuento: parseFloat(form.descuento || 0),
        observacion: form.observacion,
        productos: productosSelecionados.map(p => ({
        producto_id: p.id,
        cantidad: p.cantidad,
        precioUnitario: p.precioVenta,
        subtotal: p.subtotal
      }))
      };

      if (esEdicion) {
        await VentaService.update(id, payload);
        alert("Venta actualizada correctamente");
      } else {
        payload.usuario_id = "a3b58936-4bbd-4d70-92ab-325a48db86da";
        await VentaService.create(payload);
        alert("Venta creada correctamente");
      }

      navigate("/ventas");
    } catch (error) {
      console.error(error);
      alert(`Error ${esEdicion ? "actualizando" : "creando"} venta: ${error.message}`);
    }
  };

  const subtotal = calcularSubtotal();
  const total = calcularTotal();

  return (
    <>
      <NavbarComponent />
      
      <Box sx={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 3,
        mb: 3
      }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 3 }}>
          <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
            {esEdicion ? "✏️ Editar Venta #" + id : "📋 Nueva Venta"}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, pb: 4 }}>

        {loading ? (
          <Alert severity="info">Cargando venta...</Alert>
        ) : (
          <>
            {/* Datos de la venta */}
            <Paper sx={{ p: 3, mb: 3, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                📝 Datos de la Venta
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    fullWidth
                    options={clientes}
                    getOptionLabel={(option) => option.nombre || ""}
                    value={clientes.find(c => c.id === form.cliente_id) || null}
                    onChange={handleClienteChange}
                    renderInput={(params) => (
                      <TextField {...params} label="Cliente" placeholder="Escribe para buscar..." />
                    )}
                    noOptionsText="No se encontraron clientes"
                    filterOptions={(options, state) => {
                      return options.filter(option =>
                        option.nombre.toLowerCase().includes(state.inputValue.toLowerCase())
                      );
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Método de Pago"
                    name="metodoPago"
                    value={form.metodoPago}
                    onChange={handleChange}
                  >
                    <MenuItem value="EFECTIVO">Efectivo</MenuItem>
                    <MenuItem value="TARJETA_CREDITO">Tarjeta Crédito</MenuItem>
                    <MenuItem value="TRANSFERENCIA">Transferencia</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Estado"
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                  >
                    <MenuItem value="PENDIENTE">Pendiente</MenuItem>
                    <MenuItem value="PAGADA">Pagada</MenuItem>
                    <MenuItem value="ANULADA">Anulada</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    disabled
                    label="Total"
                    value={`$${calcularTotal().toFixed(2)}`}
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-disabled": {
                        color: "#28a745",
                        fontWeight: "bold"
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Impuesto (%)"
                    name="impuesto"
                    value={form.impuesto}
                    onChange={handleChange}
                    slotProps={{
                      htmlInput: { min: 0, step: 0.01 }
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Descuento (%)"
                    name="descuento"
                    value={form.descuento}
                    onChange={handleChange}
                    slotProps={{
                      htmlInput: { min: 0, step: 0.01 }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Observación"
                    name="observacion"
                    value={form.observacion}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Productos */}
            <Paper sx={{ p: 3, mb: 3, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  📦 Productos ({productosSelecionados.length})
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={abrirDialogoProducto}
                  sx={{ backgroundColor: "#667eea" }}
                >
                  Agregar Producto
                </Button>
              </Box>

              {productosSelecionados.length === 0 ? (
                <Alert severity="warning">
                  No hay productos. Haz clic en "Agregar Producto" para añadir uno.
                </Alert>
              ) : (
                <TableContainer sx={{ borderRadius: 1 }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#667eea" }}>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Producto</TableCell>
                        <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Precio</TableCell>
                        <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Cantidad</TableCell>
                        <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }}>Subtotal</TableCell>
                        <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Acción</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productosSelecionados.map((producto, index) => (
                        <TableRow key={index} hover>
                          <TableCell sx={{ fontWeight: 500 }}>{producto.nombre}</TableCell>
                          <TableCell align="center">
                          <TextField
                            type="number"
                            size="small"
                            value={producto.precioVenta}
                            onChange={(e) =>
                              actualizarProducto(
                                producto.id,
                                "precioVenta",
                                Number(e.target.value)
                              )
                            }
                            slotProps={{
                              htmlInput: { min: 0, step: 0.01 }
                            }}
                            sx={{ width: 100 }}
                          />
                        </TableCell>
                          <TableCell align="center">
                          <TextField
                            type="number"
                            size="small"
                            value={producto.cantidad}
                            onChange={(e) =>
                              actualizarProducto(
                                producto.id,
                                "cantidad",
                                Number(e.target.value)
                              )
                            }
                            slotProps={{
                              htmlInput: { min: 1 }
                            }}
                            sx={{ width: 80 }}
                          />
                        </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold", color: "#28a745" }}>
                            ${parseFloat(producto.subtotal).toFixed(2)}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => quitarProducto(producto.id)}
                              title="Eliminar producto"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
                        <TableCell colSpan={3} align="right" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                          SUBTOTAL:
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold", fontSize: "1rem", color: "#667eea" }}>
                          ${subtotal.toFixed(2)}
                        </TableCell>
                        <TableCell />
                      </TableRow>
                      <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
                        <TableCell colSpan={3} align="right" sx={{ fontWeight: "bold" }}>
                          IMPUESTO ({form.impuesto}%):
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold", color: "#ff9800" }}>
                          +${((subtotal * parseFloat(form.impuesto || 0)) / 100).toFixed(2)}
                        </TableCell>
                        <TableCell />
                      </TableRow>
                      <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
                        <TableCell colSpan={3} align="right" sx={{ fontWeight: "bold" }}>
                          DESCUENTO ({form.descuento}%):
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold", color: "#f44336" }}>
                          -${((subtotal * parseFloat(form.descuento || 0)) / 100).toFixed(2)}
                        </TableCell>
                        <TableCell />
                      </TableRow>
                      <TableRow sx={{ backgroundColor: "#667eea", color: "white" }}>
                        <TableCell colSpan={3} align="right" sx={{ fontWeight: "bold", fontSize: "1.2rem", color: "white" }}>
                          TOTAL:
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold", fontSize: "1.2rem", color: "white" }}>
                          ${total.toFixed(2)}
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>

            {/* Botones de acción */}
            <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/ventas")}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={handleSave}
                sx={{ backgroundColor: "#28a745" }}
              >
                {esEdicion ? "Actualizar Venta" : "Crear Venta"}
              </Button>
            </Stack>
          </>
        )}
      </Box>

      {/* Dialog para agregar productos */}
      <Dialog open={openProductoDialog} onClose={cerrarDialogoProducto} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: "#667eea", color: "white", fontWeight: "bold" }}>
          Agregar Producto
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            select
            fullWidth
            label="Seleccionar Producto"
            value={productoSeleccionado?.id ? String(productoSeleccionado.id) : ""}
            onChange={(e) => {
              const producto = productosDisponibles.find(p => String(p.id) === String(e.target.value));
              setProductoSeleccionado(producto);
            }}
            sx={{ mb: 2 }}
            disabled={productosDisponibles.length === 0}
          >
            {productosDisponibles.length === 0 ? (
              <MenuItem disabled>No hay productos disponibles</MenuItem>
            ) : (
              productosDisponibles.map((producto) => (
                <MenuItem key={producto.id} value={String(producto.id)}>
                  {producto.nombre} - ${parseFloat(producto.precioVenta).toFixed(2)}
                </MenuItem>
              ))
            )}
          </TextField>

          <TextField
            fullWidth
            type="number"
            label="Cantidad"
            value={cantidadProducto}
            onChange={(e) => setCantidadProducto(Number(e.target.value) || 1)}
            slotProps={{
              htmlInput: { min: 1 }
            }}
          />

          {productoSeleccionado && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Subtotal: ${(cantidadProducto * parseFloat(productoSeleccionado.precioVenta)).toFixed(2)}
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={cerrarDialogoProducto}>Cancelar</Button>
          <Button onClick={agregarProducto} variant="contained" sx={{ backgroundColor: "#667eea" }}>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}