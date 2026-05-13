import express from "express";
import { Sequelize, DataTypes } from "sequelize";

const app = express();

app.use(express.json());


// ==========================================
// CONEXIÓN POSTGRESQL
// ==========================================

const sequelize = new Sequelize(
  "inventariointeligente",
  "postgres",
  "Admin123",
  {
    host: "localhost",
    dialect: "postgres"
  }
);


// ==========================================
// MODELO ROL
// ==========================================

const Rol = sequelize.define("Rol", {

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


// ==========================================
// MODELO USUARIO
// ==========================================

const Usuario = sequelize.define("Usuario", {

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


// ==========================================
// MODELO CATEGORIA
// ==========================================

const Categoria = sequelize.define("Categoria", {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  nombre: {
    type: DataTypes.STRING
  },

  descripcion: {
    type: DataTypes.TEXT
  }

});


// ==========================================
// MODELO PRODUCTO
// ==========================================

const Producto = sequelize.define("Producto", {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  nombre: {
    type: DataTypes.STRING
  },

  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  precioCompra: {
    type: DataTypes.DECIMAL
  },

  precioVenta: {
    type: DataTypes.DECIMAL
  },

  stockMinimo: {
    type: DataTypes.INTEGER,
    defaultValue: 5
  }

});


// ==========================================
// MODELO VENTA
// ==========================================

const Venta = sequelize.define("Venta", {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  total: {
    type: DataTypes.DECIMAL
  },

  estado: {
    type: DataTypes.STRING
  }

});


// ==========================================
// MODELO DETALLE VENTA
// ==========================================

const DetalleVenta = sequelize.define("DetalleVenta", {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  cantidad: {
    type: DataTypes.INTEGER
  },

  precioUnitario: {
    type: DataTypes.DECIMAL
  },

  subtotal: {
    type: DataTypes.DECIMAL
  }

});


// ==========================================
// MODELO FACTURA
// ==========================================

const Factura = sequelize.define("Factura", {

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


// ==========================================
// RELACIONES
// ==========================================

Usuario.belongsTo(Rol, {
  foreignKey: "rol_id"
});

Rol.hasMany(Usuario, {
  foreignKey: "rol_id"
});


Producto.belongsTo(Categoria, {
  foreignKey: "categoria_id"
});

Categoria.hasMany(Producto, {
  foreignKey: "categoria_id"
});


Venta.belongsTo(Usuario, {
  foreignKey: "usuario_id"
});

Usuario.hasMany(Venta, {
  foreignKey: "usuario_id"
});


DetalleVenta.belongsTo(Venta, {
  foreignKey: "venta_id"
});

Venta.hasMany(DetalleVenta, {
  foreignKey: "venta_id"
});


DetalleVenta.belongsTo(Producto, {
  foreignKey: "producto_id"
});

Producto.hasMany(DetalleVenta, {
  foreignKey: "producto_id"
});


Factura.belongsTo(Venta, {
  foreignKey: "venta_id"
});

Venta.hasOne(Factura, {
  foreignKey: "venta_id"
});


// ==========================================
// SINCRONIZAR BASE DE DATOS
// ==========================================

sequelize.sync({ alter: true })
  .then(() => {

    console.log("Base de datos sincronizada");

    app.listen(3000, () => {
      console.log("Servidor corriendo en puerto 3000");
    });

  })
  .catch(error => {
    console.log(error);
  });