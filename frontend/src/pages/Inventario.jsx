import { useEffect, useState } from "react";

import ProductoService from "../services/productoService.js";

import Navbar from "../components/NavBar.jsx";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  IconButton,
  Tooltip,
  Chip,
  Button,
  Stack
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Inventario() {

  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // CARGAR PRODUCTOS
  // =========================

  useEffect(() => {

    cargarProductos();

  }, []);

  const cargarProductos = async () => {

    try {

      setLoading(true);

      const data = await ProductoService.getAll();

      setProductos(data);

    } catch (error) {

      console.log(
        "Error cargando productos:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // AGREGAR STOCK
  // =========================

  const handleAgregarCantidad = async (producto) => {

    try {

      const cantidad = prompt(
        `¿Cuántas unidades deseas agregar a ${producto.nombre}?`
      );

      if (cantidad === null) return;

      const cantidadNumero = Number(cantidad);

      if (
        isNaN(cantidadNumero) ||
        cantidadNumero <= 0
      ) {

        alert("Ingresa una cantidad válida");

        return;
      }

      const nuevoStock =
        producto.stock + cantidadNumero;

      await ProductoService.update(
        producto.id,
        {
          stock: nuevoStock
        }
      );

      await cargarProductos();

      alert("Stock actualizado correctamente");

    } catch (error) {

      console.log(
        "Error actualizando stock:",
        error
      );

      alert("Error actualizando stock");
    }
  };

  // =========================
  // ELIMINAR
  // =========================

  const handleEliminar = async (producto) => {

    try {

      const confirmar = window.confirm(
        `¿Deseas eliminar ${producto.nombre}?`
      );

      if (!confirmar) return;

      await ProductoService.delete(producto.id);

      await cargarProductos();

      alert("Producto eliminado");

    } catch (error) {

      console.log(
        "Error eliminando producto:",
        error
      );

      alert("Error eliminando producto");
    }
  };

  // =========================
  // DETALLE
  // =========================

  const handleDetalle = (producto) => {

    alert(
      `
Producto: ${producto.nombre}

Referencia: ${producto.referencia}

Stock: ${producto.stock}
      `
    );
  };

  return (

    <>

      {/* NAVBAR */}

      <Navbar />

      {/* CONTENIDO */}

      <Box p={4}>

        {/* HEADER */}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >

          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Inventario
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() =>
              navigate("/productos/nuevo")
            }
          >
            Nuevo Producto
          </Button>

        </Stack>

        {/* TABLA */}

        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            overflow: "hidden"
          }}
        >

          {
            loading ? (

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 5
                }}
              >
                <CircularProgress />
              </Box>

            ) : (

              <TableContainer>

                <Table>

                  <TableHead>

                    <TableRow>

                      <TableCell>
                        ID
                      </TableCell>

                      <TableCell>
                        Nombre
                      </TableCell>

                      <TableCell>
                        Referencia
                      </TableCell>

                      <TableCell>
                        Stock
                      </TableCell>

                      <TableCell align="center">
                        Acciones
                      </TableCell>

                    </TableRow>

                  </TableHead>

                  <TableBody>

                    {
                      productos.map((producto) => (

                        <TableRow
                          key={producto.id}
                          hover
                        >

                          <TableCell>
                            {producto.id}
                          </TableCell>

                          <TableCell>
                            {producto.nombre}
                          </TableCell>

                          <TableCell>
                            {producto.referencia}
                          </TableCell>

                          <TableCell>

                            {
                              producto.stock <= 5 ? (

                                <Chip
                                  label={producto.stock}
                                  color="error"
                                  size="small"
                                />

                              ) : (

                                <Chip
                                  label={producto.stock}
                                  color="success"
                                  size="small"
                                />

                              )
                            }

                          </TableCell>

                          {/* ACCIONES */}

                          <TableCell align="center">

                            {/* AGREGAR */}

                            <Tooltip title="Agregar cantidad">

                              <IconButton
                                color="primary"
                                onClick={() =>
                                  handleAgregarCantidad(producto)
                                }
                              >
                                <AddIcon />
                              </IconButton>

                            </Tooltip>

                            {/* EDITAR */}

                            <Tooltip title="Editar producto">

                              <IconButton
                                color="warning"
                                onClick={() =>
                                  navigate(
                                    `/productos/editar/${producto.id}`
                                  )
                                }
                              >
                                <EditIcon />
                              </IconButton>

                            </Tooltip>

                            {/* ELIMINAR */}

                            <Tooltip title="Eliminar producto">

                              <IconButton
                                color="error"
                                onClick={() =>
                                  handleEliminar(producto)
                                }
                              >
                                <DeleteIcon />
                              </IconButton>

                            </Tooltip>

                            {/* DETALLE */}

                            <Tooltip title="Ver detalle">

                              <IconButton
                                color="info"
                                onClick={() =>
                                  handleDetalle(producto)
                                }
                              >
                                <VisibilityIcon />
                              </IconButton>

                            </Tooltip>

                          </TableCell>

                        </TableRow>
                      ))
                    }

                  </TableBody>

                </Table>

              </TableContainer>
            )
          }

        </Paper>

      </Box>

    </>
  );
}