import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const DetalleVenta = sequelize.define("DetalleVenta", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  cantidad: {
    type: DataTypes.INTEGER
  },

  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2)
  },

  subtotal: {
    type: DataTypes.DECIMAL(10, 2)
  }

});