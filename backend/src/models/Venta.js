import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Venta = sequelize.define("Venta", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },

  impuesto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },

  descuento: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },

  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },

  metodoPago: {
    type: DataTypes.ENUM(
      "EFECTIVO",
      "TARJETA_CREDITO",
      "TRANSFERENCIA"
    ),
    allowNull: false
  },

  estado: {
    type: DataTypes.ENUM(
      "PENDIENTE",
      "PAGADA",
      "ANULADA"
    ),
    allowNull: false
  },

  observacion: {
    type: DataTypes.TEXT,
    allowNull: true
  }

});