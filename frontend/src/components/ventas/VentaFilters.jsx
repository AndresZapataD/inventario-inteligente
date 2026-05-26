import {
  Grid,
  TextField,
  MenuItem
} from "@mui/material";

export default function VentaFilters({ filters, setFilters }) {

  const handleChange = (e) => {

    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });

  };

  return (

    <Grid
      container
      spacing={2}
    >

      <Grid size={{ xs: 12, md: 4 }}>

        <TextField
          fullWidth
          label="Buscar"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Cliente o número factura"
        />

      </Grid>

      <Grid size={{ xs: 12, md: 2 }}>

        <TextField
          select
          fullWidth
          label="Estado"
          name="estado"
          value={filters.estado}
          onChange={handleChange}
        >

          <MenuItem value="">
            Todos
          </MenuItem>

          <MenuItem value="PAGADA">
            PAGADA
          </MenuItem>

          <MenuItem value="PENDIENTE">
            PENDIENTE
          </MenuItem>

          <MenuItem value="ANULADA">
            ANULADA
          </MenuItem>

        </TextField>

      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>

        <TextField
          fullWidth
          type="date"
          label="Fecha inicio"
          name="fechaInicio"
          value={filters.fechaInicio}
          onChange={handleChange}
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
        />

      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>

        <TextField
          fullWidth
          type="date"
          label="Fecha fin"
          name="fechaFin"
          value={filters.fechaFin}
          onChange={handleChange}
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
        />

      </Grid>

    </Grid>

  );

}