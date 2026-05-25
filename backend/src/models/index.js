import { Rol } from "./Rol.js";
import { Usuario } from "./Usuario.js";
import { Categoria } from "./Categoria.js";
import { Producto } from "./Producto.js";
import { Venta } from "./Venta.js";
import { DetalleVenta } from "./DetalleVenta.js";
import { Factura } from "./Factura.js";
import { TipoDocumento } from "./TipoDocumento.js";
import { Cliente } from "./Cliente.js";


// ==========================================
// RELACIONES
// ==========================================

// Usuario - Rol

Usuario.belongsTo(Rol, {
  foreignKey: "rol_id"
});

Rol.hasMany(Usuario, {
  foreignKey: "rol_id"
});


// Producto - Categoria

Producto.belongsTo(Categoria, {
  foreignKey: "categoria_id"
});

Categoria.hasMany(Producto, {
  foreignKey: "categoria_id"
});


// Venta - Usuario

Venta.belongsTo(Usuario, {
  foreignKey: "usuario_id"
});

Usuario.hasMany(Venta, {
  foreignKey: "usuario_id"
});


// DetalleVenta - Venta

DetalleVenta.belongsTo(Venta, {
  foreignKey: "venta_id"
});

Venta.hasMany(DetalleVenta, {
  foreignKey: "venta_id"
});


// DetalleVenta - Producto

DetalleVenta.belongsTo(Producto, {
  foreignKey: "producto_id"
});

Producto.hasMany(DetalleVenta, {
  foreignKey: "producto_id"
});


// Factura - Venta

Factura.belongsTo(Venta, {
  foreignKey: "venta_id"
});

Venta.hasOne(Factura, {
  foreignKey: "venta_id"
});
// Usuario - TipoDocumento

Usuario.belongsTo(TipoDocumento, {
  foreignKey: "TipoDocumentoId"
});

TipoDocumento.hasMany(Usuario, {
  foreignKey: "TipoDocumentoId"
});


// Cliente - TipoDocumento

Cliente.belongsTo(TipoDocumento, {
  foreignKey: "TipoDocumentoId"
});

TipoDocumento.hasMany(Cliente, {
  foreignKey: "TipoDocumentoId"
});


// EXPORTAR TODO

export {
  Rol,
  Usuario,
  Categoria,
  Producto,
  Venta,
  DetalleVenta,
  Factura,
  TipoDocumento,
  Cliente
};