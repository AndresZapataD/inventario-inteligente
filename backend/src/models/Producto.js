// ==========================================
// Entidad principal que almacena la información general de los productos del inventario
// ==========================================


import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Producto = sequelize.define("Producto", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  nombre: {
    type: DataTypes.STRING
  },

  referencia: {
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
  },

 categoria_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: "Categoria",
    key: "id"
  }
}

});