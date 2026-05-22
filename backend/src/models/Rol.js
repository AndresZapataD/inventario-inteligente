// ==========================================
// Entidad encargada de almacenar los tipos de roles del sistema, como administrador o empleado
// ==========================================

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Rol = sequelize.define("Rol", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }

});
export default Rol;