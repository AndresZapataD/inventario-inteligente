import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem
} from "@mui/material";

import ClienteService from "../services/clienteService.js";
import TipoDocumentoService from "../services/tipoDocumentoService.js";

import Navbar from "../components/NavBar.jsx";

export default function ClienteForm() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [tiposDocumento, setTiposDocumento] = useState([]);

  const [formData, setFormData] = useState({
    TipoDocumentoId: "",
    documento: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    direccion: "",
    empresa: ""
  });

  useEffect(() => {

    cargarTiposDocumento();

    if (id) {
      cargarCliente();
    }

  }, [id]);

  const cargarTiposDocumento = async () => {

    try {

      const data = await TipoDocumentoService.getAll();
      console.log(data);

      setTiposDocumento(data);

    } catch (error) {

      console.error("Error al cargar tipos de documento:", error);

    }

  };

  const cargarCliente = async () => {

    try {

      setLoading(true);

      const data = await ClienteService.getById(id);

      setFormData(data);

    } catch (error) {

      console.error("Error al cargar cliente:", error);

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      if (id) {

        await ClienteService.update(id, formData);

      } else {

        await ClienteService.create(formData);

      }

      navigate("/clientes");

    } catch (error) {

      console.error("Error al guardar cliente:", error);

    } finally {

      setLoading(false);

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
          maxWidth: "900px",
          mx: "auto",
          py: 4,
          px: 2
        }}
      >

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            border: "1px solid #e5e7eb"
          }}
        >

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1
            }}
          >
            {id ? "Editar Cliente" : "Nuevo Cliente"}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#6b7280",
              mb: 4
            }}
          >
            Completa la información del cliente
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
          >

            <Stack spacing={3}>

              <TextField
                select
                label="Tipo de Documento"
                name="TipoDocumentoId"
                value={formData.TipoDocumentoId}
                onChange={handleChange}
                fullWidth
              >

                {tiposDocumento.map((tipo) => (

                  <MenuItem
                    key={tipo.id}
                    value={tipo.id}
                  >
                    {tipo.nombre}
                  </MenuItem>

                ))}

              </TextField>

              <TextField
                label="Documento"
                name="documento"
                value={formData.documento}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Dirección"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Empresa"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                fullWidth
              />

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                  pt: 2
                }}
              >

                <Button
                  variant="outlined"
                  onClick={() => navigate("/clientes")}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2
                  }}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    px: 4
                  }}
                >
                  {loading ? "Guardando..." : "Guardar"}
                </Button>

              </Box>

            </Stack>

          </Box>

        </Paper>

      </Box>

    </Box>

  );
}