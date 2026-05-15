import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { sequelize } from "./config/database.js";

// IMPORTAR MODELOS Y RELACIONES
import "./models/index.js";

const app = express();

app.use(express.json());



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