import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Box
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";

export default function VentaFilters({ filters, setFilters }) {

  const handleChange = (e) => {

    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });

  };

  const handleClear = () => {
    setFilters({
      search: "",
      estado: "",
      fechaInicio: "",
      fechaFin: ""
    });
  };

  const hasFilters = filters.search || filters.estado || filters.fechaInicio || filters.fechaFin;

  return (

    <Box>
      <Grid
        container
        spacing={2}
        sx={{ mb: 2 }}
      >

        <Grid size={{ xs: 12, md: 4 }}>

          <TextField
            fullWidth
            label="Buscar"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Cliente o número factura"
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: <FilterListIcon sx={{ mr: 1, color: "action.active" }} />
              }
            }}
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
            variant="outlined"
          >

            <MenuItem value="">
              Todos
            </MenuItem>

            <MenuItem value="PAGADA">
              Pagada
            </MenuItem>

            <MenuItem value="PENDIENTE">
              Pendiente
            </MenuItem>

            <MenuItem value="ANULADA">
              Anulada
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
            variant="outlined"
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
            variant="outlined"
            slotProps={{
              inputLabel: {
                shrink: true
              }
            }}
          />

        </Grid>

      </Grid>

      {hasFilters && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={handleClear}
            size="small"
            color="secondary"
          >
            Limpiar filtros
          </Button>
        </Box>
      )}
    </Box>

  );

}