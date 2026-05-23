import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { sequelize } from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";


import "./models/index.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/roles", (await import("./routes/RolRoutes.js")).default);
app.use("/api/usuarios", (await import("./routes/UsuarioRoutes.js")).default);
app.use("/api/categorias", (await import("./routes/CategoriaRoutes.js")).default);
app.use("/api/productos", (await import("./routes/ProductoRoutes.js")).default);
app.use("/api/tipos-documento", (await import("./routes/TipoDocumentoRoutes.js")).default);
app.use("/api/clientes", (await import("./routes/ClienteRoutes.js")).default);
app.use("/api/auth", authRoutes);


async function main() {

  try {

    await sequelize.authenticate();

    console.log("Base de datos conectada");

    await sequelize.sync({ alter: true });

    console.log("Base de datos sincronizada");

    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    });

  } catch (error) {

    console.log(error);

  }
}

main();