import {
  Paper,
  Typography,
  Stack
} from "@mui/material";

export default function ResumenVenta({ productos }) {

  const subtotal = productos.reduce((acc, item) => {

    return acc + (
      item.precioUnitario * item.cantidad
    );

  }, 0);

  return (
    <Paper sx={{ p: 3, mb: 3 }}>

      <Stack spacing={1}>

        <Typography variant="h6">
          Resumen
        </Typography>

        <Typography>
          Subtotal: ${subtotal}
        </Typography>

        <Typography>
          Total: ${subtotal}
        </Typography>

      </Stack>

    </Paper>
  );

}