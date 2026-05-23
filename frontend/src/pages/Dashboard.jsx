import { Box, Container, Typography } from "@mui/material";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <Box
            component="main"
            sx={{
                minHeight: "100vh",
                width: "100%",
                backgroundColor: "background.default",
                display: "flex",
                flexDirection: "column" 
            }}
        >
            <Navbar />

            
            <Container
                maxWidth="lg"
                sx={{
                    flexGrow: 1, 
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 4 // Espaciado interno para que el contenido no quede pegado a los bordes
                }}
            >
                <Typography 
                    variant="h3" 
                    component="h2"
                    sx={{ 
                        fontWeight: "bold", 
                        color: "text.primary" 
                    }}
                >
                    Dashboard
                </Typography>
                
            </Container>
        </Box>
    );
}

export default Dashboard;