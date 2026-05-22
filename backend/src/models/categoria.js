// ==========================================
// Entidad utilizada para clasificar los productos según su tipo o categoría
// ==========================================


import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Categoria = sequelize.define("Categoria", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  nombre: {
    type: DataTypes.STRING
  },

  descripcion: {
    type: DataTypes.TEXT
  }

});