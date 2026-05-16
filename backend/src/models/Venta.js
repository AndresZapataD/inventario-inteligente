import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Venta = sequelize.define("Venta", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  total: {
    type: DataTypes.DECIMAL(10, 2)
  },

  estado: {
    type: DataTypes.STRING
  }

});