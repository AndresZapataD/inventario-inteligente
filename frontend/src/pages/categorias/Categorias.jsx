import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import categoriaService from "../../services/categoriaService.js";

import Navbar from "../../components/NavBar.jsx";
import CategoriasTable from "../../components/categorias/CategoriasTable.jsx";

import {
    Box,
    Typography,
    Button,
    Stack
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Categorias() {
    const navigate = useNavigate();

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            setLoading(true);
            const data = await categoriaService.getAll();
            setCategorias(data);
        }
        catch (error) {
            console.error(error);
            alert("Error cargando categorías");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Navbar />
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Categorías
                </Typography>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 3 }}
                >
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate("/categorias/nueva")}
                    >
                        Nueva Categoría
                    </Button>
                </Stack>
                <CategoriasTable
                    categorias={categorias}
                    setCategorias={setCategorias}
                />
            </Box>
        </Box>);
        
    }