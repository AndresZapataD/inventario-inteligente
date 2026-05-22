import dotenv from "dotenv";
import express from "express";
import { sequelize } from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// IMPORTAR MODELOS Y RELACIONES
import "./models/index.js";

const app = express();

app.use(express.json());

app.use("/api/roles", (await import("./routes/RolRoutes.js")).default);
app.use("/api/usuarios", (await import("./routes/UsuarioRoutes.js")).default);
app.use("/api/categorias", (await import("./routes/CategoriaRoutes.js")).default);
app.use("/api/productos", (await import("./routes/ProductoRoutes.js")).default);
app.use("/api/tipos-documento", (await import("./routes/TipoDocumentoRoutes.js")).default);
app.use("/api/clientes", (await import("./routes/ClienteRoutes.js")).default);
app.use("/api/auth", authRoutes);
app.use("/api/ventas", (await import("./routes/VentaRoutes.js")).default);
app.use("/api/detalleventas", (await import("./routes/DetalleVentaRoutes.js")).default);

try {
    await sequelize.authenticate();
    console.log("Base de datos conectada");

    await sequelize.sync({ alter: true });
    console.log("Base de datos sincronizada");

} catch(error) {
    console.log(error);
}

export default app;