// ==========================================
//Entidad que almacena los productos específicos asociados a cada venta y sus cantidades
// ==========================================


import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const DetalleVenta = sequelize.define("DetalleVenta", {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  cantidad: {
    type: DataTypes.INTEGER
  },

  precioUnitario: {
    type: DataTypes.DECIMAL
  },

  subtotal: {
    type: DataTypes.DECIMAL
  }

});