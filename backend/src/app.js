import dotenv from "dotenv";
import express from "express";
import { sequelize } from "./config/database.js";
dotenv.config();

// IMPORTAR MODELOS Y RELACIONES
import "./models/index.js";

const app = express();

app.use(express.json());

app.use("/api/roles", (await import("./routes/RolRoutes.js")).default);
app.use("/api/usuario", (await import("./UsuarioRoutes.js")).default);
app.use("/api/categorias", (await import("./routes/CategoriaRoutes.js")).default);
app.use("/api/productos", (await import("./routes/ProductoRoutes.js")).default);

// ==========================================
// INICIAR SERVIDOR
// ==========================================

async function main() {
  try {
    await sequelize.authenticate();

    console.log("Base de datos conectada");

    await sequelize.sync({ alter: true });

    console.log("Base de datos sincronizada");

    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    });

  } catch(error) {
    console.log(error);
  }
}

main();