import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Rol = sequelize.define("Rol", {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }

});
export default Rol;