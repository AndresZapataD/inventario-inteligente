import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const DetalleVenta = sequelize.define("DetalleVenta", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  nombreProducto: {
    type: DataTypes.STRING,
    allowNull: false
  },

  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },

  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }

});