//==========================================================
//Entidad que almacena la información de los usuarios que utilizan el sistema y su rol asignado
//==========================================================

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Usuario = sequelize.define("Usuario", {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  nombre: {
    type: DataTypes.STRING
  },

  email: {
    type: DataTypes.STRING,
    unique: true
  },

  password: {
    type: DataTypes.STRING
  },

  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }

});