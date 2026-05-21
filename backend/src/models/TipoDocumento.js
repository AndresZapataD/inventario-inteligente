import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const TipoDocumento = sequelize.define("TipoDocumento", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        unique: true
    }
});
