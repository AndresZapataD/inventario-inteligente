// ==========================================
// Entidad encargada de generar y almacenar la información de facturación de cada venta
// ==========================================

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Factura = sequelize.define("Factura", {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  numeroFactura: {
    type: DataTypes.STRING
  },

  total: {
    type: DataTypes.DECIMAL
  }

});