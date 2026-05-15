// ==========================================
// Entidad utilizada para clasificar los productos según su tipo o categoría
// ==========================================


import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Categoria = sequelize.define("Categoria", {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  nombre: {
    type: DataTypes.STRING
  },

  descripcion: {
    type: DataTypes.TEXT
  }

});