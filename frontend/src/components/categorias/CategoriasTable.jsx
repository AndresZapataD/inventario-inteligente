import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    TableContainer,
    Paper,
    Box,
    Typography,
    CircularProgress
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useNavigate } from "react-router-dom";
import categoriaService from "../../services/categoriaService";

export default function CategoriasTable({
    categorias,
    setCategorias,
    loading
}) {
    const navigate = useNavigate();

    const handleDelete = async (id) => {

        if (window.confirm("¿Confirma que desea eliminar esta categoría?")) {
            try {
                await categoriaService.delete(id);
                setCategorias(categorias.filter(cat => cat.id !== id));
            } catch (error) {
                console.error(error);
                alert("Error eliminando categoría");
            }
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (categorias.length === 0) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
                <Typography variant="h6" color="textSecondary">
                    No hay categorías para mostrar
                </Typography>
            </Box>
        );
    }

    return (
  <TableContainer component={Paper} sx={{ mb: 3 }}>

    <Table>

      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Descripción</TableCell>
          <TableCell align="right">Acciones</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>

        {categorias.map((categoria) => (

          <TableRow key={categoria.id}>

            <TableCell>
              {categoria.id}
            </TableCell>

            <TableCell>
              {categoria.nombre}
            </TableCell>

            <TableCell>
              {categoria.descripcion}
            </TableCell>

            <TableCell align="right">

              <IconButton
                color="primary"
                onClick={() =>
                  navigate(`/categorias/${categoria.id}/editar`)
                }
              >
                <EditIcon />
              </IconButton>

              <IconButton
                color="error"
                onClick={() =>
                  handleDelete(categoria.id)
                }
              >
                <DeleteIcon />
              </IconButton>

            </TableCell>

          </TableRow>

        ))}

      </TableBody>

    </Table>

  </TableContainer>
);

}