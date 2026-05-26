import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  IconButton
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export default function CarritoVenta({
  productos,
  setProductos
}) {

  const handleDelete = (index) => {

    const updated = [...productos];

    updated.splice(index, 1);

    setProductos(updated);

  };

  const handlePriceChange = (index, value) => {

    const updated = [...productos];

    updated[index].precioUnitario = Number(value);

    setProductos(updated);

  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>

      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Subtotal</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {productos.map((item, index) => (

            <TableRow key={index}>

              <TableCell>
                {item.nombreProducto}
              </TableCell>

              <TableCell>
                {item.cantidad}
              </TableCell>

              <TableCell>
                <TextField
                  type="number"
                  value={item.precioUnitario}
                  onChange={(e) =>
                    handlePriceChange(index, e.target.value)
                  }
                />
              </TableCell>

              <TableCell>
                $
                {item.precioUnitario * item.cantidad}
              </TableCell>

              <TableCell>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </Paper>
  );

}