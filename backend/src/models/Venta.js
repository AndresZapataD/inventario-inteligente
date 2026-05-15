// ==========================================
// Entidad que registra las ventas realizadas dentro del sistema
// ==========================================

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Venta = sequelize.define("Venta", {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  total: {
    type: DataTypes.DECIMAL
  },

  estado: {
    type: DataTypes.STRING
  }

});