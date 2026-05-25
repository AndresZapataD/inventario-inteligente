import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { TipoDocumento } from "./TipoDocumento.js";
import { Rol } from "./Rol.js";

export const Usuario = sequelize.define("Usuario", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  nombre: {
    type: DataTypes.STRING
  },

  apellido: {
    type: DataTypes.STRING,
    allowNull: true
  },

  tipoDocumento_id: {
    type: DataTypes.INTEGER,
    references: {
      model: TipoDocumento,
      key: "id"
    }
  },

  documento: {
    type: DataTypes.STRING,
    unique: true,
    nullable: true
  },

  direccion: {
    type: DataTypes.STRING,
    nullable: true
  },

  fechanacimiento: {
    type: DataTypes.DATE,
    nullable: true
  },

  email: {
    type: DataTypes.STRING,
    unique: true
  },

  password: {
    type: DataTypes.STRING
  },

  rol_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Rol,
      key: "id"
    }
  },

  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }

});