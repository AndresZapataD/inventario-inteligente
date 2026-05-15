// ==========================================
// Entidad principal que almacena la información general de los productos del inventario
// ==========================================


import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Producto = sequelize.define("Producto", {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  nombre: {
    type: DataTypes.STRING
  },

  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  precioCompra: {
    type: DataTypes.DECIMAL(10, 2)
  },

  precioVenta: {
    type: DataTypes.DECIMAL(10, 2)
  },

  stockMinimo: {
    type: DataTypes.INTEGER,
    defaultValue: 5
  }

});