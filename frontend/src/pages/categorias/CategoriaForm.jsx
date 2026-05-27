import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack
} from "@mui/material";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import categoriaService from "../../services/categoriaService";

export default function CategoriaForm() {

  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: ""
  });

  // ==========================================
  // CARGAR CATEGORÍA
  // ==========================================

  useEffect(() => {

    if (isEdit) {
      loadCategoria();
    }

  }, [id]);

  const loadCategoria = async () => {

    try {

      const data = await categoriaService.getById(id);

      setFormData({
        nombre: data.nombre || "",
        descripcion: data.descripcion || ""
      });

    } catch (error) {

      console.error(error);

      alert("Error cargando categoría");

    }

  };

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // ==========================================
  // GUARDAR
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      if (!formData.nombre.trim()) {

        alert("El nombre es obligatorio");

        return;

      }

      if (isEdit) {

        await categoriaService.update(id, formData);

        alert("Categoría actualizada correctamente");

      } else {

        await categoriaService.create(formData);

        alert("Categoría creada correctamente");

      }

      navigate("/categorias");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.error ||
        "Error guardando categoría"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4
      }}
    >

      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 600,
          borderRadius: 3
        }}
      >

        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "#667eea"
          }}
        >
          {isEdit
            ? "✏️ Editar Categoría"
            : "📦 Nueva Categoría"}
        </Typography>

        <form onSubmit={handleSubmit}>

          <Stack spacing={3}>

            <TextField
              label="Nombre"
              name="nombre"
              fullWidth
              required
              value={formData.nombre}
              onChange={handleChange}
            />

            <TextField
              label="Descripción"
              name="descripcion"
              fullWidth
              multiline
              rows={4}
              value={formData.descripcion}
              onChange={handleChange}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2
              }}
            >

              <Button
                variant="outlined"
                onClick={() => navigate("/categorias")}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor: "#667eea"
                }}
              >
                {loading
                  ? "Guardando..."
                  : isEdit
                    ? "Actualizar"
                    : "Crear"}
              </Button>

            </Box>

          </Stack>

        </form>

      </Paper>

    </Box>

  );

}