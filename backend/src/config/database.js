import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "inventario_inteligente",
  "postgres",
  "1234",
  {
    host: "localhost",
    dialect: "postgres"
  }
);

export default sequelize;