import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export default function VentaTable({ ventas = [] }) {

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/ventas/editar/${id}`);
  };

  return (
    <TableContainer>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Método Pago</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {ventas.map((venta) => (
            <TableRow key={venta.id}>

              <TableCell>{venta.id}</TableCell>
              <TableCell>{venta.Cliente?.nombre}</TableCell>
              <TableCell>${venta.total}</TableCell>
              <TableCell>{venta.metodoPago}</TableCell>

              <TableCell>
                <Chip label={venta.estado} />
              </TableCell>

              <TableCell>
                {venta.createdAt
                  ? new Date(venta.createdAt).toLocaleDateString()
                  : "-"}
              </TableCell>

              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(venta.id)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}