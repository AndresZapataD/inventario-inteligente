import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar.jsx";

import {
  Box,
  Typography,
  Button,
  Paper,
  Stack
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import VentaService from "../../services/VentaService";

import VentaFilters from "../../components/ventas/VentaFilters";
import VentaTable from "../../components/ventas/VentaTable";

export default function VentaList() {

  const navigate = useNavigate();

  const [ventas, setVentas] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    estado: "",
    fechaInicio: "",
    fechaFin: ""
  });

  const loadVentas = async () => {

    try {

      const response = await VentaService.getAll();

      setVentas(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadVentas();

  }, []);

  return (

    <>
    
      <Navbar />

      <Box p={3}>

        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3
          }}
        >

          <Typography variant="h4">
            Ventas
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/ventas/nueva")}
          >
            Nueva Venta
          </Button>

        </Stack>

        <Paper sx={{ p: 2, mb: 3 }}>

          <VentaFilters
            filters={filters}
            setFilters={setFilters}
          />

        </Paper>

        <Paper sx={{ p: 2 }}>

          <VentaTable ventas={ventas} />

        </Paper>

      </Box>

    </>

  );

}