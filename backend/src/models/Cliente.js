import {DataTypes} from "sequelize";
import {sequelize} from "../config/database.js";
import { TipoDocumento } from "./TipoDocumento.js";

export const Cliente = sequelize.define("Cliente", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    TipoDocumentoId: {
        type: DataTypes.INTEGER,
        references: {
            model: TipoDocumento,
            key: "id"
        }
    },

    documento: {
        type: DataTypes.STRING,
        unique: true
    },

    nombre: {
        type: DataTypes.STRING
    },

    apellido: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING,
        unique: true
    },
    telefono: {
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.STRING
    },
    empresa: {
        type: DataTypes.STRING
    }
});
