import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem
} from "@mui/material";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import ProductoService from "../services/productoService.js";
import CategoriaService from "../services/categoriaService.js";

export default function ProductoForm() {

  const navigate = useNavigate();

  const { id } = useParams();

  // =========================
  // STATES
  // =========================

  const [categorias, setCategorias] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    nombre: "",
    referencia: "",
    stock: 0,
    costo: "",
    precioVenta: "",
    stockMinimo: 5,
    categoria_id: "",
    codigoBarras: "",
    estado: "activo"
  });

  const [originalData, setOriginalData] = useState(null);

  // =========================
  // USE EFFECT
  // =========================

  useEffect(() => {

    cargarCategorias();

    if (id) {

      cargarProducto();
    }

  }, [id]);

  // =========================
  // CARGAR CATEGORIAS
  // =========================

  const cargarCategorias = async () => {

    try {

      const data =
        await CategoriaService.getAll();

      setCategorias(data);

    } catch (error) {

      console.log(
        "Error cargando categorías:",
        error
      );
    }
  };

  // =========================
  // CARGAR PRODUCTO
  // =========================

  const cargarProducto = async () => {

    try {

      setLoading(true);

      const producto =
        await ProductoService.getById(id);

      const datosProducto = {

        nombre: producto.nombre || "",

        referencia:
          producto.referencia || "",

        stock: producto.stock || 0,

        costo: producto.costo || "",

        precioVenta:
          producto.precioVenta || "",

        stockMinimo:
          producto.stockMinimo || 5,

        categoria_id:
          producto.categoria_id || "",

        codigoBarras:
          producto.codigoBarras || "",

        estado:
          producto.estado || "activo"
      };

      setFormData(datosProducto);
      setOriginalData(datosProducto);

    } catch (error) {

      console.log(
        "Error cargando producto:",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      // VALIDACIONES

      if (
        !formData.nombre ||
        !formData.referencia ||
        !formData.categoria_id
      ) {

        alert(
          "Completa los campos obligatorios"
        );

        return;
      }

      // VALIDAR PRECIOS

      if (
        Number(formData.precioVenta) <
        Number(formData.costo)
      ) {

        alert(
          "El precio de venta no puede ser menor al costo"
        );

        return;
      }

      // Preparar datos a enviar
      let data;

      // Si es edición, solo enviar campos que cambiaron
      if (id && originalData) {
        data = {};
        
        // Comparar cada campo y solo incluir los que cambiaron
        Object.keys(formData).forEach(key => {
          if (formData[key] !== originalData[key]) {
            data[key] = formData[key];
          }
        });

        // Convertir números
        if (data.stock !== undefined) data.stock = Number(data.stock);
        if (data.costo !== undefined) data.costo = Number(data.costo);
        if (data.precioVenta !== undefined) data.precioVenta = Number(data.precioVenta);
        if (data.stockMinimo !== undefined) data.stockMinimo = Number(data.stockMinimo);
        if (data.categoria_id !== undefined) data.categoria_id = Number(data.categoria_id);

        // Si no hay cambios, mostrar mensaje
        if (Object.keys(data).length === 0) {
          alert("No hay cambios para guardar");
          setLoading(false);
          return;
        }
      } else {
        // Si es creación, enviar todo
        data = {

          ...formData,

          stock:
            Number(formData.stock),

          costo:
            Number(formData.costo),

          precioVenta:
            Number(formData.precioVenta),

          stockMinimo:
            Number(formData.stockMinimo),

          categoria_id:
            Number(formData.categoria_id)
        };
      }

      // EDITAR

      if (id) {

        await ProductoService.update(
          id,
          data
        );

        alert(
          "Producto actualizado"
        );

      } else {

        // CREAR

        await ProductoService.create(
          data
        );

        alert(
          "Producto creado"
        );
      }

      navigate("/inventario");

    } catch (error) {

      console.log(
        "Error guardando producto:",
        error
      );

      alert(
        "Error guardando producto"
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // CALCULOS
  // =========================

  const ganancia =
    Number(formData.precioVenta || 0)
    -
    Number(formData.costo || 0);

  return (

    <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    p: 3
  }}
>

      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 700,
          p: 4,
          borderRadius: 4
        }}
      >

      <Typography
        variant="h4"
      sx={{
      fontWeight: "bold",
      mb: 4,
      textAlign: "center"
  }}
>

          {
            id
              ? "Editar Producto"
              : "Nuevo Producto"
          }

        </Typography>

        <form onSubmit={handleSubmit}>

          <Stack spacing={3}>

            <TextField
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Referencia"
              name="referencia"
              value={formData.referencia}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Código de barras"
              name="codigoBarras"
              value={formData.codigoBarras}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Stock mínimo"
              name="stockMinimo"
              type="number"
              value={formData.stockMinimo}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Costo"
              name="costo"
              type="number"
              value={formData.costo}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Precio de venta"
              name="precioVenta"
              type="number"
              value={formData.precioVenta}
              onChange={handleChange}
              fullWidth
            />

            {/* GANANCIA */}

            <Typography>

              Ganancia estimada:
              <strong>
                {" "}
                ${ganancia}
              </strong>

            </Typography>

            {/* CATEGORIA */}

            <TextField
              select
              label="Categoría"
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleChange}
              fullWidth
              required
            >

              {
                categorias.map(
                  (categoria) => (

                    <MenuItem
                      key={categoria.id}
                      value={categoria.id}
                    >
                      {categoria.nombre}
                    </MenuItem>
                  )
                )
              }

            </TextField>

            {/* ESTADO */}

            <TextField
              select
              label="Estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              fullWidth
            >

              <MenuItem value="activo">
                Activo
              </MenuItem>

              <MenuItem value="inactivo">
                Inactivo
              </MenuItem>

            </TextField>

            {/* BOTONES */}

            <Stack
  direction="row"
  spacing={2}
  sx={{ justifyContent: "flex-end" }}
>

              <Button
                variant="outlined"
                onClick={() =>
                  navigate("/inventario")
                }
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
              >

                {
                  id
                    ? "Actualizar"
                    : "Guardar"
                }

              </Button>

            </Stack>

          </Stack>

        </form>

      </Paper>

    </Box>
  );
}